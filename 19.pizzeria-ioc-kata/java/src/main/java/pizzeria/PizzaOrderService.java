package pizzeria;

import java.util.List;
import java.util.UUID;

public class PizzaOrderService {
    private final Logger logger = new ConsoleLogger();
    private final Clock clock = new SystemClock();
    private final PaymentGateway paymentGateway = new FakePaymentGateway();
    private final NotificationSender notificationSender = new ConsoleNotificationSender();
    private final OrderRepository orderRepository = new InMemoryOrderRepository();

    public Order placeOrder(String customerId, List<Pizza> items) {
        double total = items.stream().mapToDouble(Pizza::price).sum();

        logger.log("Placing order for " + customerId);

        if (!paymentGateway.charge(customerId, total)) {
            logger.log("Payment failed for " + customerId);
            throw new IllegalStateException("Payment failed for " + customerId);
        }

        Order order = new Order(UUID.randomUUID().toString(), customerId, items, clock.now());
        orderRepository.save(order);

        notificationSender.send(customerId, "Your order has been placed!");
        logger.log("Order " + order.id() + " placed successfully");

        return order;
    }
}

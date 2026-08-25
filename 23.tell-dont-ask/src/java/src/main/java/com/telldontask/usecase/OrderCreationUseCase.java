package com.telldontask.usecase;

import com.telldontask.domain.Order;
import com.telldontask.domain.OrderItem;
import com.telldontask.domain.OrderStatus;
import com.telldontask.domain.Product;
import com.telldontask.repository.OrderRepository;
import com.telldontask.repository.ProductCatalog;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Map;

public class OrderCreationUseCase {
    private final OrderRepository orderRepository;
    private final ProductCatalog productCatalog;

    public OrderCreationUseCase(OrderRepository orderRepository, ProductCatalog productCatalog) {
        this.orderRepository = orderRepository;
        this.productCatalog = productCatalog;
    }

    public void run(String clientId, Map<String, Integer> items) {
        Order order = new Order(0, OrderStatus.CREATED, "EUR", new ArrayList<>(), BigDecimal.ZERO, BigDecimal.ZERO);

        for (Map.Entry<String, Integer> itemRequest : items.entrySet()) {
            Product product = productCatalog.getByName(itemRequest.getKey());

            if (product == null) {
                throw new UnknownProductException();
            } else {
                BigDecimal unitaryTax = round(product.getPrice()
                        .multiply(product.getCategory().getTaxPercentage())
                        .divide(BigDecimal.valueOf(100), 10, RoundingMode.HALF_UP));
                BigDecimal unitaryTaxedAmount = round(product.getPrice().add(unitaryTax));
                BigDecimal quantity = BigDecimal.valueOf(itemRequest.getValue());
                BigDecimal taxedAmount = round(unitaryTaxedAmount.multiply(quantity));
                BigDecimal taxAmount = round(unitaryTax.multiply(quantity));

                OrderItem orderItem = new OrderItem(product, itemRequest.getValue(), taxedAmount, taxAmount);
                order.getItems().add(orderItem);
                order.setTotal(order.getTotal().add(taxedAmount));
                order.setTax(order.getTax().add(taxAmount));
            }
        }

        orderRepository.save(order);
    }

    private static BigDecimal round(BigDecimal amount) {
        return amount.setScale(2, RoundingMode.HALF_UP);
    }
}

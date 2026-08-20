package pizzeria;

import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        PizzaOrderService orderService = new PizzaOrderService();

        int customerCount = 6;
        ExecutorService executor = Executors.newFixedThreadPool(customerCount);
        Instant start = Instant.now();

        for (int i = 1; i <= customerCount; i++) {
            String customerId = "customer-" + i;
            executor.submit(() -> orderService.placeOrder(customerId, List.of(new Pizza("Margherita", 9.5))));
        }

        executor.shutdown();
        executor.awaitTermination(30, TimeUnit.SECONDS);

        Duration elapsed = Duration.between(start, Instant.now());
        System.out.println(customerCount + " commandes simultanées traitées en " + elapsed.toMillis() + " ms");
        System.out.println("(chaque commande simule ~100ms de latence DB : un temps proche de "
                + customerCount + " x 100ms révèle un goulot d'étranglement, pas du vrai parallélisme)");
    }
}

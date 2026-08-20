package pizzeria;

import org.junit.jupiter.api.Test;

import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import static org.assertj.core.api.Assertions.assertThat;

class PizzaOrderConcurrencyTest {

    @Test
    void concurrent_orders_are_serialized_by_the_shared_repository() throws InterruptedException {
        PizzaOrderService orderService = new PizzaOrderService();
        int customerCount = 5;
        ExecutorService executor = Executors.newFixedThreadPool(customerCount);
        Instant start = Instant.now();

        for (int i = 0; i < customerCount; i++) {
            String customerId = "customer-" + i;
            executor.submit(() -> orderService.placeOrder(customerId, List.of(new Pizza("Margherita", 9.5))));
        }
        executor.shutdown();
        executor.awaitTermination(10, TimeUnit.SECONDS);

        long elapsedMs = Duration.between(start, Instant.now()).toMillis();
        System.out.println(customerCount + " commandes concurrentes traitées en " + elapsedMs + " ms");

        // Chaque `save()` simule ~100ms de latence DB (cf. InMemoryOrderRepository).
        // Si les commandes étaient vraiment traitées en parallèle, on s'attendrait
        // à un temps total proche de la latence d'une seule commande (~100-150ms).
        // Avec le repository actuel (une seule instance, `synchronized`), les accès
        // sont sérialisés : le temps total se rapproche de customerCount x 100ms.
        // C'est ce bottleneck que vous allez explorer puis résoudre dans les étapes
        // suivantes (facilitation/05, 06 et 07).
        assertThat(elapsedMs).isGreaterThan((customerCount - 1) * 80L);
    }
}

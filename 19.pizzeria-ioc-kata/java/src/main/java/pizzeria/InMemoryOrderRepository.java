package pizzeria;

import java.util.ArrayList;
import java.util.List;

/**
 * `save` is `synchronized` and simulates a real DB round-trip (~100ms) on purpose:
 * this repository behaves correctly under concurrent access, but sharing a single
 * instance of it (Singleton) serializes every caller on the same lock.
 */
public class InMemoryOrderRepository implements OrderRepository {
    private final List<Order> orders = new ArrayList<>();

    @Override
    public synchronized void save(Order order) {
        simulateSlowIO();
        orders.add(order);
    }

    @Override
    public synchronized List<Order> findAll() {
        return List.copyOf(orders);
    }

    private void simulateSlowIO() {
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

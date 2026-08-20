package pizzeria;

import java.time.Instant;
import java.util.List;

public record Order(String id, String customerId, List<Pizza> items, Instant placedAt) {
}

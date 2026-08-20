package weather;

import java.time.Instant;

public interface Clock {
    Instant now();
}

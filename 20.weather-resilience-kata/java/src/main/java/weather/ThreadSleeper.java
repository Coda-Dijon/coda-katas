package weather;

import java.time.Duration;

public class ThreadSleeper implements Sleeper {
    @Override
    public void sleep(Duration duration) {
        try {
            Thread.sleep(duration.toMillis());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

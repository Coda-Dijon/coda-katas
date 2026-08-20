package weather;

import java.time.Instant;

public record WeatherReport(String city, double temperatureCelsius, String condition, Instant fetchedAt) {
}

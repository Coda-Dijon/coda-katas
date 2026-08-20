package weather;

import java.time.Instant;
import java.util.Random;

/**
 * Simule une vraie API météo externe : latence variable et ~40% d'échecs.
 * Utilisée par {@link Main} pour observer le comportement du système en conditions
 * réalistes. Les tests unitaires, eux, utilisent des doubles de test entièrement
 * contrôlables (pas cette classe).
 */
public class UnreliableWeatherApi implements WeatherApi {
    private final Random random = new Random();

    @Override
    public WeatherReport fetch(String city) {
        simulateNetworkLatency();

        if (random.nextInt(100) < 40) {
            throw new WeatherApiException("Weather API is temporarily unavailable");
        }

        return new WeatherReport(city, 18.0 + random.nextInt(10), "Partly cloudy", Instant.now());
    }

    private void simulateNetworkLatency() {
        try {
            Thread.sleep(50 + random.nextInt(150));
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

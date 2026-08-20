package weather;

import java.time.Instant;
import java.util.Random;

/**
 * Simule une vraie API météo externe : latence variable et ~40% d'échecs.
 * Ces échecs sont volontairement de deux natures différentes (voir
 * facilitation/03.retry-simple.md) : ~30% d'échecs transitoires (503, comme une
 * vraie surcharge serveur passagère) et ~10% d'échecs définitifs (400, une ville
 * inconnue qui échouera de la même façon à chaque tentative).
 * Utilisée par {@link Main} pour observer le comportement du système en conditions
 * réalistes. Les tests unitaires, eux, utilisent des doubles de test entièrement
 * contrôlables (pas cette classe).
 */
public class UnreliableWeatherApi implements WeatherApi {
    private final Random random = new Random();

    @Override
    public WeatherReport fetch(String city) {
        simulateNetworkLatency();

        int outcome = random.nextInt(100);
        if (outcome < 30) {
            throw new WeatherApiException("Weather API is temporarily unavailable", 503);
        }
        if (outcome < 40) {
            throw new WeatherApiException("Unknown city: " + city, 400);
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

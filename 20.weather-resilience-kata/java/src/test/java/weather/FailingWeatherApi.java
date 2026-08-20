package weather;

/**
 * Double de test entièrement contrôlable : échoue à chaque appel et compte
 * le nombre d'appels reçus.
 */
public class FailingWeatherApi implements WeatherApi {
    private int callCount = 0;

    @Override
    public WeatherReport fetch(String city) {
        callCount++;
        throw new WeatherApiException("Weather API is down");
    }

    public int callCount() {
        return callCount;
    }
}

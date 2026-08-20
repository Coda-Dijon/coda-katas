package weather;

public class WeatherApiException extends RuntimeException {
    private final int statusCode;

    public WeatherApiException(String message) {
        this(message, 503);
    }

    public WeatherApiException(String message, int statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

    /**
     * Code d'erreur HTTP simulé (503 par défaut). Utile pour décider, à l'étape 3,
     * si une tentative supplémentaire a des chances de réussir (ex. 503, 504, 429)
     * ou si elle échouera toujours de la même façon (ex. 400, 404).
     */
    public int statusCode() {
        return statusCode;
    }
}

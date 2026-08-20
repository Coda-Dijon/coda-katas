package weather;

public class WeatherDigestService {
    private final WeatherApi weatherApi;

    public WeatherDigestService(WeatherApi weatherApi) {
        this.weatherApi = weatherApi;
    }

    public WeatherReport getTodayForecast(String city) {
        return weatherApi.fetch(city);
    }
}

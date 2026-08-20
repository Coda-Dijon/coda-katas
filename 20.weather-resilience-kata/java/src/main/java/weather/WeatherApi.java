package weather;

public interface WeatherApi {
    WeatherReport fetch(String city);
}

package weather;

public class Main {
    public static void main(String[] args) {
        WeatherDigestService service = new WeatherDigestService(new UnreliableWeatherApi());

        for (int i = 1; i <= 10; i++) {
            try {
                WeatherReport report = service.getTodayForecast("Dijon");
                System.out.println("OK   #" + i + " -> " + report);
            } catch (WeatherApiException e) {
                System.out.println("FAIL #" + i + " -> " + e.getMessage());
            }
        }
    }
}

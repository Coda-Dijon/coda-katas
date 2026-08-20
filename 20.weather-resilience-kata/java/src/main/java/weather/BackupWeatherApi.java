package weather;

import java.time.Instant;

/**
 * Fournisseur météo de secours : toujours disponible, mais moins précis
 * (données en cache, non datées). Destiné au fallback / failover (étape 7).
 */
public class BackupWeatherApi implements WeatherApi {
    @Override
    public WeatherReport fetch(String city) {
        return new WeatherReport(city, 15.0, "Unknown (cached fallback)", Instant.EPOCH);
    }
}

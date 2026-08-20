package weather;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class WeatherDigestServiceTest {

    @Test
    void propagates_the_failure_immediately_without_retrying() {
        FailingWeatherApi api = new FailingWeatherApi();
        WeatherDigestService service = new WeatherDigestService(api);

        assertThatThrownBy(() -> service.getTodayForecast("Dijon"))
                .isInstanceOf(WeatherApiException.class);

        // Aucune tentative supplémentaire : le code actuel n'a aucune logique de
        // retry, de timeout, de circuit breaker ou de fallback. C'est ce que vous
        // allez construire dans les étapes suivantes (voir facilitation/01.constat.md).
        assertThat(api.callCount()).isEqualTo(1);
    }
}

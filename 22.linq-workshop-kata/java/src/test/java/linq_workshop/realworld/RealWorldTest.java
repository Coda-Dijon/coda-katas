package linq_workshop.realworld;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import linq_workshop.realworld.watch.Component;
import linq_workshop.realworld.watch.ComponentType;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

class RealWorldTest {

    private static Component watch;

    @BeforeAll
    static void globalSetup() throws IOException {
        watch = deserializeWatch();
    }

    private static Component deserializeWatch() throws IOException {
        var mapper = new ObjectMapper()
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        try (InputStream input = RealWorldTest.class.getClassLoader().getResourceAsStream("watch.json")) {
            return mapper.readValue(input, Component.class);
        }
    }

    @Test
    void allComponents() {
        int totalCount = 0;

        assertThat(totalCount).isEqualTo(564);
    }

    @Test
    void markers() {
        List<Component> markers = null;

        assertThat(markers).hasSize(14);
        assertThat(markers.stream().map(c -> c.name).toList()).containsExactlyInAnyOrder(
            "Markers 305",
            "Markers 142",
            "Markers 243",
            "Markers 269",
            "Markers 288",
            "Markers 333",
            "Markers 338",
            "Markers 345",
            "Markers 426",
            "Markers 457",
            "Markers 468",
            "Markers 472",
            "Markers 494",
            "Markers 540"
        );
    }

    @Test
    void findAllComponentStartingWith() {
        long countDial = 0;

        assertThat(countDial).isEqualTo(18);
    }

    @Test
    void countComponentByTypes() {
        Map<ComponentType, Long> types = null;

        assertThat(types.get(ComponentType.Oscillator)).isEqualTo(25);
        assertThat(types.get(ComponentType.BalanceWheel)).isEqualTo(18);
        assertThat(types.get(ComponentType.Wheel)).isEqualTo(19);
    }

    @Test
    void mostComplex() {
        Component mostComplexComponent = null;
        int componentsInsideBezel = 0;

        assertThat(mostComplexComponent.name).isEqualTo("Bezel 1");
        assertThat(componentsInsideBezel).isEqualTo(38);
    }

    @Test
    void averageComponentsByType() {
        Map<ComponentType, Double> averageSubcomponentsByType = null;
    }
}

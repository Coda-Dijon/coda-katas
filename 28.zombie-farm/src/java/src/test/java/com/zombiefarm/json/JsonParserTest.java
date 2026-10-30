package com.zombiefarm.json;

import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

// Fourni : documente la forme de l'arbre renvoyé par JsonParser.
class JsonParserTest {
    @Test
    @SuppressWarnings("unchecked")
    void un_objet_devient_une_map_qui_garde_l_ordre_des_cles() {
        Map<String, Object> tree = JsonParser.parse(
                "{\"zombie_name\":\"Gérard\",\"hoursWorkedToday\":23,\"brainsPerHour\":2.5}", Map.class);

        assertThat(tree)
                .containsExactly(
                        Map.entry("zombie_name", "Gérard"),
                        Map.entry("hoursWorkedToday", 23L),
                        Map.entry("brainsPerHour", 2.5)
                );
    }

    @Test
    void un_tableau_devient_une_liste() {
        assertThat(JsonParser.parse("[true, false, null, \"dit \\\"Braaains\\\"\\n\"]", List.class))
                .isEqualTo(Arrays.asList(true, false, null, "dit \"Braaains\"\n"));
    }

    @Test
    @SuppressWarnings("unchecked")
    void les_valeurs_imbriquees_restent_des_Object_dont_il_faut_tester_le_type() {
        Map<String, Object> tree = JsonParser.parse(
                "{\"supervisor\":{\"yearsOfService\":666},\"skills\":[]}", Map.class);

        assertThat(tree.get("supervisor")).isEqualTo(Map.of("yearsOfService", 666L));
        assertThat(tree.get("skills")).isEqualTo(List.of());
    }

    @Test
    void une_racine_qui_n_a_pas_le_type_demande_leve_une_JsonMappingException() {
        assertThatThrownBy(() -> JsonParser.parse("[\"pas\", \"un\", \"objet\"]", Map.class))
                .isInstanceOf(JsonMappingException.class)
                .hasMessage("La racine du JSON est un tableau, impossible de la lire comme Map");
    }

    @Test
    void un_json_invalide_leve_une_JsonMappingException() {
        assertThatThrownBy(() -> JsonParser.parse("{\"zombie_name\":", Map.class))
                .isInstanceOf(JsonMappingException.class);
    }
}

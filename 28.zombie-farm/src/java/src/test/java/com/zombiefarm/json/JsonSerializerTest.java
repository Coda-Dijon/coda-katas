package com.zombiefarm.json;

import com.zombiefarm.models.BodyPart;
import com.zombiefarm.models.Brain;
import com.zombiefarm.models.Necromancer;
import com.zombiefarm.models.Zombie;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class JsonSerializerTest {
    private final JsonSerializer serializer = new JsonSerializer();

    private static Zombie gerard() {
        return new Zombie(
                "Gérard",
                23,
                2.5,
                false,
                new Necromancer("Morgana", "Contremaîtresse des Ténèbres", 666),
                List.of(new BodyPart("bras gauche", true), new BodyPart("dignité", false)),
                List.of("porter des cartons", "gémir en réunion", "fixer le mur"),
                "Gérard Dupont, ex-comptable"
        );
    }

    @Nested
    class Serialize {
        @Test
        void serialise_les_entiers_dans_l_ordre_de_declaration() {
            assertThat(serializer.serialize(new Brain(1200, 3)))
                    .isEqualTo("{\"grams\":1200,\"neuronsLeft\":3}");
        }

        @Test
        @Disabled("À écrire")
        void serialise_un_objet_sans_champ_en_accolades_vides() {
        }

        @Test
        @Disabled("À écrire")
        void serialise_les_chaines_en_echappant_guillemets_antislash_et_retour_a_la_ligne() {
        }

        @Test
        @Disabled("À écrire")
        void serialise_les_decimaux_les_booleens_et_null() {
        }

        @Test
        @Disabled("À écrire")
        void serialise_un_objet_imbrique() {
        }

        @Test
        @Disabled("À écrire")
        void serialise_les_listes_de_chaines_et_d_objets() {
        }

        @Test
        @Disabled("À écrire")
        void ignore_les_champs_statiques() {
        }

        @Test
        @Disabled("À écrire")
        void ignore_les_champs_marques_JsonIgnore() {
        }

        @Test
        @Disabled("À écrire")
        void renomme_les_champs_marques_JsonName() {
        }

        @Test
        @Disabled("À écrire")
        void serialise_gerard_au_complet() {
        }
    }

    @Nested
    class Deserialize {
        @Test
        @Disabled("À écrire")
        void deserialise_les_entiers() {
        }

        @Test
        @Disabled("À écrire")
        void deserialise_les_chaines_les_decimaux_les_booleens_et_null() {
        }

        @Test
        @Disabled("À écrire")
        void deserialise_un_objet_imbrique() {
        }

        @Test
        @Disabled("À écrire")
        void deserialise_les_listes_de_chaines_et_d_objets() {
        }

        @Test
        @Disabled("À écrire")
        void lit_la_cle_JsonName() {
        }

        @Test
        @Disabled("À écrire")
        void ne_lit_jamais_un_champ_JsonIgnore() {
        }

        @Test
        @Disabled("À écrire")
        void garde_la_valeur_par_defaut_d_un_champ_absent_du_json() {
        }

        @Test
        @Disabled("À écrire")
        void ignore_les_cles_json_inconnues() {
        }

        @Test
        @Disabled("À écrire")
        void leve_une_JsonMappingException_si_un_type_ne_correspond_pas() {
        }

        @Test
        @Disabled("À écrire")
        void leve_une_JsonMappingException_si_la_racine_n_est_pas_un_objet() {
        }

        @Test
        @Disabled("À écrire")
        void deserialize_de_serialize_redonne_le_meme_zombie() {
            // Astuce : assertThat(...).usingRecursiveComparison().isEqualTo(gerard())
        }
    }
}

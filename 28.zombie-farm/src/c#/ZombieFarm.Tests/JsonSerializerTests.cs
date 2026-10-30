using FluentAssertions;
using Xunit;
using ZombieFarm.Json;
using ZombieFarm.Tests.Models;

namespace ZombieFarm.Tests;

public class JsonSerializerTests
{
    private readonly JsonSerializer _serializer = new();

    private static Zombie Gerard() => new()
    {
        Name = "Gérard",
        HoursWorkedToday = 23,
        BrainsPerHour = 2.5,
        Unionized = false,
        Supervisor = new Necromancer { Name = "Morgana", Title = "Contremaîtresse des Ténèbres", YearsOfService = 666 },
        MissingBodyParts =
        [
            new BodyPart { Name = "bras gauche", Reattachable = true },
            new BodyPart { Name = "dignité", Reattachable = false }
        ],
        Skills = ["porter des cartons", "gémir en réunion", "fixer le mur"],
        HumanIdentity = "Gérard Dupont, ex-comptable"
    };

    public class Serialize : JsonSerializerTests
    {
        [Fact]
        public void Serialise_les_entiers_dans_l_ordre_de_declaration() =>
            _serializer.Serialize(new Brain { Grams = 1200, NeuronsLeft = 3 })
                .Should().Be("""{"grams":1200,"neuronsLeft":3}""");

        [Fact(Skip = "À écrire")]
        public void Serialise_un_objet_sans_propriete_en_accolades_vides() { }

        [Fact(Skip = "À écrire")]
        public void Serialise_les_chaines_en_echappant_guillemets_antislash_et_retour_a_la_ligne() { }

        [Fact(Skip = "À écrire")]
        public void Serialise_les_decimaux_les_booleens_et_null() { }

        [Fact(Skip = "À écrire")]
        public void Serialise_un_objet_imbrique() { }

        [Fact(Skip = "À écrire")]
        public void Serialise_les_listes_de_chaines_et_d_objets() { }

        [Fact(Skip = "À écrire")]
        public void Ignore_les_proprietes_statiques() { }

        [Fact(Skip = "À écrire")]
        public void Ignore_les_proprietes_marquees_JsonIgnore() { }

        [Fact(Skip = "À écrire")]
        public void Renomme_les_proprietes_marquees_JsonName() { }

        [Fact(Skip = "À écrire")]
        public void Serialise_Gerard_au_complet() { }
    }

    public class Deserialize : JsonSerializerTests
    {
        [Fact(Skip = "À écrire")]
        public void Deserialise_les_entiers() { }

        [Fact(Skip = "À écrire")]
        public void Deserialise_les_chaines_les_decimaux_les_booleens_et_null() { }

        [Fact(Skip = "À écrire")]
        public void Deserialise_un_objet_imbrique() { }

        [Fact(Skip = "À écrire")]
        public void Deserialise_les_listes_de_chaines_et_d_objets() { }

        [Fact(Skip = "À écrire")]
        public void Lit_la_cle_JsonName() { }

        [Fact(Skip = "À écrire")]
        public void Ne_lit_jamais_une_propriete_JsonIgnore() { }

        [Fact(Skip = "À écrire")]
        public void Garde_la_valeur_par_defaut_d_une_propriete_absente_du_json() { }

        [Fact(Skip = "À écrire")]
        public void Ignore_les_cles_json_inconnues() { }

        [Fact(Skip = "À écrire")]
        public void Leve_une_JsonMappingException_si_un_type_ne_correspond_pas() { }

        [Fact(Skip = "À écrire")]
        public void Leve_une_JsonMappingException_si_la_racine_n_est_pas_un_objet() { }

        // Astuce : .Should().BeEquivalentTo(...) compare les objets propriété par propriété
        [Fact(Skip = "À écrire")]
        public void Deserialize_de_Serialize_redonne_le_meme_zombie() { }
    }
}

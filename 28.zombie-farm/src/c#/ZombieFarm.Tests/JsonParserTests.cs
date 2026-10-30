using FluentAssertions;
using Xunit;
using ZombieFarm.Json;

namespace ZombieFarm.Tests;

// Fourni : documente la forme de l'arbre renvoyé par JsonParser.
public class JsonParserTests
{
    [Fact]
    public void Un_objet_devient_un_dictionnaire_qui_garde_l_ordre_des_cles()
    {
        var tree = JsonParser.Parse<Dictionary<string, object?>>(
            """{"zombie_name":"Gérard","hoursWorkedToday":23,"brainsPerHour":2.5}""");

        tree.Should().Equal(new Dictionary<string, object?>
        {
            ["zombie_name"] = "Gérard",
            ["hoursWorkedToday"] = 23L,
            ["brainsPerHour"] = 2.5
        });
        tree.Keys.Should().ContainInOrder("zombie_name", "hoursWorkedToday", "brainsPerHour");
    }

    [Fact]
    public void Un_tableau_devient_une_liste() =>
        JsonParser.Parse<List<object?>>("""[true, false, null, "dit \"Braaains\"\n"]""")
            .Should().BeEquivalentTo(new List<object?> { true, false, null, "dit \"Braaains\"\n" },
                options => options.WithStrictOrdering());

    [Fact]
    public void Les_valeurs_imbriquees_restent_des_object_dont_il_faut_tester_le_type()
    {
        var tree = JsonParser.Parse<Dictionary<string, object?>>(
            """{"supervisor":{"yearsOfService":666},"skills":[]}""");

        tree["supervisor"].Should().BeOfType<Dictionary<string, object?>>()
            .Which["yearsOfService"].Should().Be(666L);
        tree["skills"].Should().BeOfType<List<object?>>().Which.Should().BeEmpty();
    }

    [Fact]
    public void Une_racine_qui_n_a_pas_le_type_demande_leve_une_JsonMappingException()
    {
        var parse = () => JsonParser.Parse<Dictionary<string, object?>>("""["pas", "un", "objet"]""");

        parse.Should().Throw<JsonMappingException>()
            .WithMessage("La racine du JSON est un tableau, impossible de la lire comme Dictionary<String, Object>");
    }

    [Fact]
    public void Un_json_invalide_leve_une_JsonMappingException()
    {
        var parse = () => JsonParser.Parse<Dictionary<string, object?>>("""{"zombie_name":""");

        parse.Should().Throw<JsonMappingException>();
    }
}

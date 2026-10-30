<?php

use Tests\Models\BodyPart;
use Tests\Models\Brain;
use Tests\Models\Necromancer;
use Tests\Models\Zombie;
use ZombieFarm\Json\JsonSerializer;

function gerard(): Zombie
{
    return new Zombie(
        name: 'Gérard',
        hoursWorkedToday: 23,
        brainsPerHour: 2.5,
        unionized: false,
        supervisor: new Necromancer('Morgana', 'Contremaîtresse des Ténèbres', 666),
        missingBodyParts: [new BodyPart('bras gauche', true), new BodyPart('dignité', false)],
        skills: ['porter des cartons', 'gémir en réunion', 'fixer le mur'],
        humanIdentity: 'Gérard Dupont, ex-comptable',
    );
}

describe('serialize', function () {
    it("sérialise les entiers dans l'ordre de déclaration", function () {
        $serializer = new JsonSerializer();

        expect($serializer->serialize(new Brain(1200, 3)))->toBe('{"grams":1200,"neuronsLeft":3}');
    });

    it('sérialise un objet sans propriété en {}')->todo();
    it('sérialise les chaînes en échappant ", \\ et le retour à la ligne')->todo();
    it('sérialise les décimaux, les booléens et null')->todo();
    it('sérialise un objet imbriqué')->todo();
    it("sérialise les listes de chaînes et d'objets")->todo();
    it('ignore les propriétés statiques')->todo();
    it('ignore les propriétés marquées #[JsonIgnore]')->todo();
    it('renomme les propriétés marquées #[JsonName]')->todo();
    it('sérialise Gérard au complet')->todo();
});

describe('deserialize', function () {
    it('désérialise les entiers')->todo();
    it('désérialise les chaînes, les décimaux, les booléens et null')->todo();
    it('désérialise un objet imbriqué')->todo();
    it("désérialise les listes de chaînes et d'objets (#[ListOf])")->todo();
    it('lit la clé #[JsonName]')->todo();
    it('ne lit jamais une propriété #[JsonIgnore]')->todo();
    it("garde la valeur par défaut d'une propriété absente du JSON")->todo();
    it('ignore les clés JSON inconnues')->todo();
    it('lève une JsonMappingException si un type ne correspond pas')->todo();
    it("lève une JsonMappingException si la racine n'est pas un objet")->todo();
    // Astuce : toEqual compare propriété par propriété, toBeInstanceOf vérifie la classe
    it('deserialize(serialize(gérard)) redonne le même zombie')->todo();
});

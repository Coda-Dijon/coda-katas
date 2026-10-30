## L'Élevage de Zombies : JSON par réflexion

### **Contexte**
L'élevage **Brains & Co** loue des zombies travailleurs aux entreprises du coin : ils ne dorment pas, ne prennent pas de pause café et se contentent de quelques cerveaux de l'heure.

Le service RH (Ressources Humaines Décomposées) veut exposer ses zombies via une API. Problème : le stagiaire nécromancien a interdit toute librairie de sérialisation ("elles sont maudites"). Vous allez donc écrire **votre propre sérialiseur JSON**, capable de transformer **n'importe quel objet** en JSON et inversement, sans connaître ses classes à l'avance.

Pour ça, une seule arme : la **réflexion**, c'est-à-dire la capacité d'un programme à **inspecter sa propre structure à l'exécution** (quels champs a cet objet ? de quel type ? avec quelles annotations ?) et à la **manipuler** (lire / écrire un champ, créer une instance d'une classe dont on ne connaît que le nom).

C'est exactement ce que font Jackson, System.Text.Json, le Serializer de Symfony ou class-transformer... et maintenant vous.

### **Le modèle**
```
Zombie
  @JsonName("zombie_name") name   "Gérard"
  hoursWorkedToday                23
  brainsPerHour                   2.5          (le salaire, en cerveaux)
  unionized                       false        (pour l'instant...)
  supervisor                      Necromancer  (ou null : zombie en roue libre)
  missingBodyParts                liste de BodyPart
  skills                          liste de chaînes
  @JsonIgnore humanIdentity       "Gérard Dupont, ex-comptable"   (RGPD des morts-vivants)
  static MAX_HOURS_PER_DAY = 24   (convention collective)

Necromancer
  name
  @JsonName("dark_title") title
  yearsOfService

BodyPart
  name
  reattachable
```
Pour les premiers pas, deux classes plus simples : `Brain { grams, neuronsLeft }` et `Coffin {}` (un cercueil vide, sans aucun champ).

Les modèles sont dans le dossier de **tests** : votre sérialiseur ne doit **jamais** les connaître. S'il fonctionne pour un `Zombie`, il doit fonctionner pour n'importe quelle classe. N'hésitez pas à créer vos propres classes de test.

### **Le résultat attendu**
`serialize(gerard)` doit produire (sur une seule ligne, sans espaces) :
```json
{"zombie_name":"Gérard","hoursWorkedToday":23,"brainsPerHour":2.5,"unionized":false,"supervisor":{"name":"Morgana","dark_title":"Contremaîtresse des Ténèbres","yearsOfService":666},"missingBodyParts":[{"name":"bras gauche","reattachable":true},{"name":"dignité","reattachable":false}],"skills":["porter des cartons","gémir en réunion","fixer le mur"]}
```
Remarquez : `humanIdentity` a disparu, `MAX_HOURS_PER_DAY` aussi, et deux clés ont été renommées.

### **Règles**

#### Sérialisation : `serialize(objet) -> texte JSON`
1. Un objet devient `{"cle":valeur,...}`, avec ses champs **dans l'ordre de déclaration**, sans espaces.
2. La clé est le nom du champ, sauf s'il porte `JsonName` : on utilise alors le nom donné.
3. Les champs portant `JsonIgnore` et les champs **statiques** ne sont jamais écrits.
4. Les valeurs :

| Valeur                        | JSON                                                              |
|-------------------------------|-------------------------------------------------------------------|
| chaîne                        | entre guillemets, en échappant `"` → `\"`, `\` → `\\`, retour à la ligne → `\n` |
| entier                        | `23`                                                              |
| décimal                       | `2.5` (avec un **point**, quelle que soit la langue du système)    |
| booléen                       | `true` / `false`                                                  |
| absence de valeur             | `null`                                                            |
| liste / tableau               | `[...]`, chaque élément sérialisé avec ces mêmes règles           |
| autre objet                   | sérialisé récursivement avec ces mêmes règles                     |

#### Désérialisation : `deserialize(json, Classe) -> objet`
1. Le texte JSON est d'abord transformé en **arbre** par le `JsonParser` **fourni** (voir plus bas). Votre travail commence à partir de cet arbre.
2. On crée une instance de la classe demandée avec son **constructeur sans argument**.
3. Pour chaque champ (mêmes règles que la sérialisation : `JsonName`, `JsonIgnore`, statiques), on cherche la clé correspondante dans le JSON :
   - clé **absente** → le champ **garde sa valeur par défaut** ;
   - clé **présente** → la valeur est convertie vers le **type du champ** : primitive, objet (récursivement), liste (en convertissant chaque élément).
4. Les clés JSON qui ne correspondent à aucun champ sont **ignorées**.
5. Une valeur qui ne correspond pas au type du champ (une chaîne pour un entier, un nombre pour un objet...) lève une `JsonMappingException` dont le message nomme le champ fautif. Idem si la racine du JSON n'est pas un objet.
6. Un entier JSON peut alimenter un champ décimal (`3` → `3.0`), pas l'inverse.

Propriété à garder en tête : pour tout objet `o`, `deserialize(serialize(o), Classe)` doit redonner un objet **équivalent** à `o` (aux champs `JsonIgnore` près).

### **Ce qui est fourni**
Dans chaque langage :
- les annotations `JsonName` et `JsonIgnore` (+ des annotations de type en PHP et TypeScript, voir ci-dessous) ;
- l'exception `JsonMappingException` ;
- un `JsonParser` qui transforme un texte JSON en arbre générique (objet → map / dictionnaire, tableau → liste, et les valeurs primitives). Écrire un parser JSON est un autre kata : ici on se concentre sur la réflexion ;
- un `JsonSerializer` dont les méthodes lèvent une erreur "pas encore implémentée" : **c'est à vous** ;
- les modèles, un premier test (rouge) et la liste des tests suivants (désactivés / `todo`).

**Interdit** : utiliser le sérialiseur objet de la plateforme (`Jackson`/`Gson`, `System.Text.Json.JsonSerializer`, `JSON.stringify` sur vos objets, `json_encode` sur vos objets). C'est justement ce que vous êtes en train de réécrire.

### **Spécificités par langage**

#### Java (`src/java`, `mvn test`)
- `JsonParser.parse(json, type)` est générique : l'appelant choisit le type de la racine (`parse(json, Map.class)`). Si la racine n'a pas ce type, une `JsonMappingException` est levée. Les valeurs **à l'intérieur** de l'arbre restent des `Object` dont il faut tester le type (`value instanceof Long`, `value instanceof List<?> items`...).
- Effacement des génériques : `Map.class` existe, `Map<String, Object>.class` non. `parse` renvoie donc une `Map` brute, et l'affecter à une `Map<String, Object>` provoque un avertissement *unchecked* (d'où le `@SuppressWarnings("unchecked")` dans `JsonParserTest`).
- Point d'entrée : `Class<?>`, `getDeclaredFields()`, `Field.get` / `Field.set`, `field.setAccessible(true)` pour les champs `private`.
- Statiques : `Modifier.isStatic(field.getModifiers())`.
- Annotations : `field.getAnnotation(JsonName.class)`, `field.isAnnotationPresent(JsonIgnore.class)`.
- Instanciation : `type.getDeclaredConstructor().newInstance()`.
- Listes : `field.getType()` ne renvoie que `List`. Pour savoir que c'est une `List<BodyPart>`, il faut passer par `field.getGenericType()` et `ParameterizedType.getActualTypeArguments()`.
- Le parser renvoie les entiers en `Long` et les décimaux en `Double` : à vous de les convertir en `int`, `double`...
- Pour comparer des objets sans `equals` : `assertThat(actual).usingRecursiveComparison().isEqualTo(expected)`.

#### C# (`src/c#`, `dotnet test`)
- `JsonParser.Parse<T>` est générique : l'appelant choisit le type de la racine (`Parse<Dictionary<string, object?>>(json)`). Si la racine n'a pas ce type, une `JsonMappingException` est levée. Les valeurs **à l'intérieur** de l'arbre restent des `object?` dont il faut tester le type (`value is long`, `value is List<object?> items`...).
- On sérialise les **propriétés** publiques (`GetProperties()`, `PropertyInfo.GetValue` / `SetValue`).
- Les clés JSON sont en **camelCase** : `HoursWorkedToday` → `hoursWorkedToday`.
- Statiques : `GetProperties()` sans paramètre renvoie aussi les propriétés **statiques** ! Regardez `BindingFlags`.
- Attributs : `property.GetCustomAttribute<JsonNameAttribute>()`.
- Instanciation : `Activator.CreateInstance(type)`.
- Listes : `type.IsGenericType`, `GetGenericTypeDefinition() == typeof(List<>)`, `GetGenericArguments()`.
- Décimaux : `2.5.ToString()` sur une machine en français donne `"2,5"`... Pensez à `CultureInfo.InvariantCulture`.
- `Deserialize<T>` est générique, mais la récursion aura besoin d'une version qui prend un `Type`.
- Pour comparer des objets sans `Equals` : `actual.Should().BeEquivalentTo(expected)`.

#### TypeScript (`src/typescript`, `npm test`)
- TypeScript **efface les types** à la compilation : à l'exécution, rien ne dit que `supervisor` contient un `Necromancer`. Deux conventions compensent :
  - chaque champ a une **valeur par défaut** : `Object.keys(new Zombie())` donne la liste des champs, et `typeof` de la valeur par défaut donne le type des primitives ;
  - les **décorateurs** gardent le reste : `@JsonName`, `@JsonIgnore()`, `@JsonType(() => Necromancer)` pour un champ objet, `@JsonArrayOf(() => BodyPart)` pour un tableau d'objets.
- `getJsonMetadata(instance, champ)` (fourni, dans `src/annotations.ts`) relit ces informations. `tests/annotations.test.ts` montre comment s'en servir.
- Les champs `static` sont portés par la classe, pas par l'instance : `Object.keys` ne les voit pas.
- Pour comparer : `toEqual` (champ par champ) et `toBeInstanceOf` (la classe).

#### PHP (`src/php`, `composer install` puis `composer test`)
- Point d'entrée : `ReflectionClass`, `getProperties()`, `ReflectionProperty::getValue` / `setValue`, `isStatic()`.
- Attributs : `$property->getAttributes(JsonName::class)`, puis `->newInstance()`.
- Types : `$property->getType()` renvoie un `ReflectionNamedType` (`getName()`, `isBuiltin()`, `allowsNull()`).
- Le type `array` ne dit pas ce qu'il contient : l'attribut fourni `#[ListOf(BodyPart::class)]` donne la classe des éléments.
- Instanciation : `new $class()` ou `$reflection->newInstance()`. Attention, `newInstanceWithoutConstructor()` ne donnerait pas les valeurs par défaut des propriétés promues du constructeur.
- `JsonParser::parse` renvoie des tableaux PHP : `{}` et `[]` donnent tous les deux `[]`, et `array_is_list()` aide à distinguer un objet d'une liste.

### **Étapes suggérées (TDD)**
1. `Brain` → `{"grams":1200,"neuronsLeft":3}` (le test fourni).
2. `Coffin` → `{}`.
3. Les chaînes (avec échappement), les décimaux, les booléens, `null`.
4. Un objet imbriqué (`Necromancer` dans `Zombie`), puis les listes.
5. Les statiques, `JsonIgnore`, `JsonName`... et Gérard au complet.
6. Passez à `deserialize` : `Brain`, puis les primitives, l'objet imbriqué, les listes.
7. Les règles du JSON "imparfait" : clé absente, clé inconnue, type inattendu, racine qui n'est pas un objet.
8. Le test aller-retour : `deserialize(serialize(gerard))`.

### **Objectifs pédagogiques**
- Découvrir la **réflexion** : inspecter les champs, types et annotations d'un objet inconnu à l'exécution, lire et écrire ses valeurs, créer des instances dynamiquement.
- Comprendre comment fonctionnent les **annotations / attributs / décorateurs** : de simples métadonnées, qui ne font rien tant qu'un code ne les relit pas par réflexion.
- Mesurer ce que chaque langage garde (ou efface) des types à l'exécution : génériques Java effacés mais récupérables via les champs, génériques C# conservés, types TypeScript totalement effacés, `array` PHP non typé.
- Écrire un algorithme **récursif** sur une structure arbitraire.
- Comprendre ce qui se passe **sous le capot** des librairies de sérialisation utilisées tous les jours (et pourquoi elles exigent souvent un constructeur sans argument).

### **Extensions (bonus)**
- **Enums** : ajoutez un `ZombieType` (`SHAMBLER`, `RUNNER`, `CRAWLER`) sérialisé par son nom.
- **Dates** : la date de résurrection, au format ISO 8601.
- **Maps** : `Map<String, Integer> brainsEatenPerDay`.
- **Cycles** : un zombie dont le superviseur a pour favori... ce même zombie. Détectez la boucle au lieu de partir en `StackOverflow`.
- **Convertisseurs** : un attribut `@JsonConverter(BrainConverter.class)` pour personnaliser la sérialisation d'un champ.
- **Objets immuables** : désérialisez des `record` Java / C# ou des classes `readonly` PHP, qui n'ont pas de constructeur sans argument.
- **Pretty print** : une option pour indenter le JSON produit.
- **Performance** : la réflexion est lente. Mettez en cache les métadonnées de chaque classe et mesurez la différence sur 100 000 zombies.

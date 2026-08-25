## LINQ Workshop — Collections fonctionnelles (C#, Java, TypeScript)

### **Contexte**
Que ce soit en C# (`LINQ`), en Java (`Stream API`) ou en TypeScript (les méthodes natives des tableaux `map`/`filter`/`reduce`...), la même idée revient sans cesse dans le métier : transformer, filtrer, regrouper et agréger des collections de données **sans boucle `for`**, en chaînant des opérations déclaratives plutôt qu'en décrivant pas à pas comment les exécuter.

Ce workshop vous fait manipuler ces trois API sur les **mêmes exercices**, pour que vous puissiez comparer les idiomes d'un langage à l'autre plutôt que de les apprendre isolément. Chaque langage a son propre projet de tests indépendant :

| Langage      | API de collections               | Dossier |
|--------------|-----------------------------------|---------|
| C#           | LINQ (`System.Linq`)              | [`c#/`](c#)   |
| Java         | Stream API (`java.util.stream`)   | [`java/`](java) |
| TypeScript   | Méthodes natives des `Array`      | [`ts/`](ts)   |

Dans les trois cas, le principe est le même : **tous les tests sont écrits, et la plupart échouent délibérément** (une assertion compare une valeur codée en dur, jamais la vraie donnée). Votre travail est de remplacer ces valeurs bidons par une véritable requête sur la collection, jusqu'à ce que le test passe pour la bonne raison.

### **Les 3 parties**

| #  | Partie                                  | Objectif                                                                                          |
|----|------------------------------------------|-----------------------------------------------------------------------------------------------------|
| 1  | `01-fundamentals`                        | Manipuler des fonctions comme des valeurs (composition, lambdas) avant d'attaquer les collections. |
| 2  | `02-queries` (Part 1 puis Part 2)         | Filtrer, projeter, trier, grouper et agréger une petite base de `Person` / `Pet` / `Park`.          |
| 3  | `03-real-world`                          | Appliquer ces mêmes opérations sur un **vrai jeu de données arborescent** (564 composants d'une montre, chargés depuis un JSON), avec de la récursion. |

### **Partie 1 — Fundamentals**
Deux fichiers de test, indépendants des données du reste du workshop :
- `Extensions` (C#) / `Basics` (Java, TypeScript) : trois exercices courts (palindrome, nombre pair, angle normalisé sur 360°). Le test appelle directement la fonction attendue (`"racecar".IsPalindrome()` en C#, `isPalindrome("racecar")` en Java/TypeScript) ; c'est l'implémentation, absente au départ (elle lève une exception), que vous devez écrire.
  - En **C#**, ce sont de vraies **méthodes d'extension** sur `string`/`int` (`this string str`), le mécanisme LINQ lui-même repose dessus.
  - En **Java** et **TypeScript**, les méthodes d'extension n'existent pas comme fonctionnalité du langage : ce sont de simples fonctions statiques (`Basics.isPalindrome`) / fonctions libres (`isPalindrome(...)`).
- `PlayWithFunctions` : composer deux fonctions (`Add1` puis `Double`) et vérifier une propriété (un nombre dont l'écriture binaire est un palindrome), pour manipuler des fonctions comme des valeurs de première classe (`Func`/`Function`/fonctions fléchées selon le langage).

### **Partie 2 — Queries**
Un jeu de données fixe de 8 `Person`, chacune avec zéro ou plusieurs `Pet`, et 3 `Park` ayant chacun une liste d'espèces autorisées.

**Part 1** couvre les opérations de base : projeter (`Select`/`map`), filtrer (`Where`/`filter`), tester (`Any`/`All`), compter (`Count`), trouver un élément unique (`Single`/`Find`).

**Part 2** enchaîne sur des opérations plus avancées : aplatir une collection de collections (`SelectMany`/`flatMap`), dédupliquer (`Distinct`), trier (`OrderBy`/`sorted`), prendre les *n* premiers (`Take`), agréger en une valeur (`Aggregate`/`reduce`), et construire un dictionnaire croisant deux collections (`ToDictionary`/`Collectors.toMap`/`Map`).

**Exemple concret (`GetPeopleWithCats`) :** sur les 8 personnes du jeu de données, seules Mary et Bob ont un chat parmi leurs animaux — la requête doit filtrer les personnes dont au moins un animal est de type `Cat`, puis n'en garder que le prénom.

### **Partie 3 — Real World**
Un vrai fichier `watch.json` (montre "Yellow Submarine", 564 composants au total, imbriqués récursivement : un `Bezel` contient des `Marker`, qui contiennent des `Dial`, qui contiennent des `Jewel` et des `Oscillator`...) sert de terrain pour des requêtes qui ne peuvent plus se résoudre en une seule opération plate :
- Aplatir tout l'arbre en une liste de composants (`GetAllComponents`, récursif).
- Filtrer par type (`Markers`), par préfixe de nom (`Dial`), compter, grouper par type.
- Trouver le composant qui a le plus de sous-composants directs.
- Calculer, par type, la moyenne du nombre de sous-composants.

C'est l'occasion de discuter **performance** : parcourir l'arbre une fois en gardant le résultat en cache est très différent de reparcourir tout l'arbre à chaque requête — utile pour relier ce kata à des questions de complexité algorithmique une fois les tests au vert.

### **Différences entre les 3 langages**
Ce n'est pas un simple copier-coller traduit mot à mot : chaque écosystème a ses propres idiomes.
- **Syntaxe de requête** : LINQ propose une syntaxe façon SQL (`from p in People select p.FirstName`) en plus de la syntaxe méthode (`People.Select(...)`). Java et TypeScript n'ont que la syntaxe méthode — la version C# du premier exercice de la Part 1 existe donc en deux variantes, les versions Java et TypeScript n'en ont qu'une.
- **Méthodes d'extension** : LINQ ajoute ses opérateurs directement sur `IEnumerable<T>` via des méthodes d'extension, et la Partie 1 vous en fait écrire vous-même (`IsPalindrome`, `IsEven`, `ToAngle` sur `string`/`int`). Java (Stream API) et TypeScript (méthodes natives des `Array`) fonctionnent nativement, sans mécanisme d'extension à connaître : les mêmes exercices y sont de simples fonctions statiques/libres, pas des méthodes ajoutées à `String`/`number`.
- **Assertions de collection** : `CollectionAssert.AreEquivalent` (NUnit) n'a pas d'équivalent standard partout. Le port C# utilise FluentAssertions (`.Should().BeEquivalentTo(...)`, convention déjà en place dans [`16.money-problem/c#`](../16.money-problem/c%23)), le port Java AssertJ (`containsExactlyInAnyOrder`), le port TypeScript une petite fonction utilitaire `sameMembers` (`tests/support/collections.ts`) qui trie puis compare.

### **Comment lancer les tests**
- **C#** : `cd c# && dotnet test` (xUnit + FluentAssertions, .NET 10)
- **Java** : `cd java && mvn test` (JUnit 5 + AssertJ)
- **TypeScript** : `cd ts && npm install && npm test` (vitest)

Dans les trois cas, vous devez voir une majorité de tests **rouges** au départ : c'est le point de départ attendu, pas une erreur de configuration.

### **Objectifs pédagogiques**
- Manipuler des collections de façon déclarative (`map`/`filter`/`reduce` et leurs équivalents), sans boucle `for` explicite.
- Comparer les idiomes fonctionnels de trois écosystèmes différents sur les mêmes cas d'usage.
- Pratiquer la composition de fonctions et les fonctions comme valeurs de première classe.
- Passer d'une collection plate à une structure arborescente (récursion sur une collection de collections).
- Relier la lisibilité d'une requête déclarative à sa performance réelle (partie Real World).

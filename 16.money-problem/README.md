## Money Problem

![Xtrem T.D.D](https://github.com/les-tontons-crafters/xtrem-tdd-money-kata/blob/ed12f3fd2fea8a70f6e9af117adc556590eb5688/docs/img/xtrem-tdd-logo.png?raw=true)

### **Contexte**
Vous développez une application de type tableur permettant de gérer un portefeuille d'actifs financiers multi-devises (un peu comme un portefeuille boursier). Il faut pouvoir additionner, multiplier et diviser des montants exprimés dans différentes devises, en s'appuyant sur des taux de change.

**Exemples d'opérations à supporter :**
- `5 USD x 2 = 10 USD`
- `4002 KRW / 4 = 1000.5 KRW`
- `5 USD + 10 EUR = 17.5 USD`

Ce kata est tiré du livre *Learning Test-Driven Development* de Saleem Siddiqui. La version proposée ici ([xtrem-tdd-money-kata](https://github.com/les-tontons-crafters/xtrem-tdd-money-kata) par les Tontons Crafters) fournit une base de code déjà fonctionnelle (calcul de `Money`, addition simple, `Bank` avec taux de change) et un parcours en **12 exercices progressifs**, à réaliser en **TDD** et en **pair/mob programming**.

### **Pré-requis**
- Le déroulé détaillé des 12 exercices est décrit [ici](https://github.com/les-tontons-crafters/xtrem-tdd-money-kata/blob/main/docs/concrete-practice.md).

### **Les 12 étapes**

| #  | Étape                                                                                                                                                                | Objectif succinct                                                                                                                                                                                     |
|----|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1  | [Mutation Testing](https://github.com/les-tontons-crafters/xtrem-tdd-money-kata/blob/main/docs/facilitation/01.mutation-testing.md)                                  | Lancer un outil de mutation testing sur vos tests existants, analyser le rapport et "tuer les mutants" survivants pour fiabiliser votre filet de sécurité.                                            |
| 2  | [Portfolio](https://github.com/les-tontons-crafters/xtrem-tdd-money-kata/blob/main/docs/facilitation/02.portfolio.md)                                                | Implémenter la classe `Portfolio` en TDD pour gérer l'addition de montants multi-devises (`5 USD + 10 EUR = 17.5 USD`), par triangulation, en gérant aussi le cas d'un taux de change manquant.       |
| 3  | [Eliminate Primitive Obsession](https://github.com/les-tontons-crafters/xtrem-tdd-money-kata/blob/main/docs/facilitation/03.no-primitive-types.md)                   | Combattre la primitive obsession en introduisant un concept `Money` depuis les tests, puis refactorer `Portfolio` et `Bank` pour l'utiliser.                                                          |
| 4  | [Remove For Loops](https://github.com/les-tontons-crafters/xtrem-tdd-money-kata/blob/main/docs/facilitation/04.no-for-loops.md)                                      | Supprimer toutes les boucles `for`, tests au vert en continu, en s'appuyant sur des idiomes de programmation fonctionnelle.                                                                           |
| 5  | [Only Immutable Types](https://github.com/les-tontons-crafters/xtrem-tdd-money-kata/blob/main/docs/facilitation/05.only-immutable-types.md)                          | Repérer les types mutables du code et les refactorer en types immuables, toujours en TDD.                                                                                                             |
| 6  | [No Exception Authorized](https://github.com/les-tontons-crafters/xtrem-tdd-money-kata/blob/main/docs/facilitation/06.no-exception-authorized.md)                    | Identifier où des exceptions sont levées dans `Portfolio`/`Bank` et les remplacer par un autre mécanisme de gestion d'erreur.                                                                         |
| 7  | [Use an Existing Monad](https://github.com/les-tontons-crafters/xtrem-tdd-money-kata/blob/main/docs/facilitation/07.use-existing-monad.md)                           | Remplacer votre `ConversionResult` maison par une monade existante de l'écosystème (ex. Vavr en Java, Language-Ext en C#, ou les monades natives de Scala).                                           |
| 8  | [Bank Properties](https://github.com/les-tontons-crafters/xtrem-tdd-money-kata/blob/main/docs/facilitation/08.bank-properties.md)                                    | Écrire un test basé sur les propriétés (Property-Based Testing) pour vérifier la propriété de "round-trip" : convertir A → B → A doit redonner le montant de départ.                                  |
| 9  | [Bank Example Mapping](https://github.com/les-tontons-crafters/xtrem-tdd-money-kata/blob/main/docs/facilitation/09.bank-example-mapping.md)                          | Animer un atelier d'Example Mapping sur 3 users stories de change de devises, pour extraire les règles métier et au moins un exemple clé par règle.                                                   |
| 10 | [Redesign Bank](https://github.com/les-tontons-crafters/xtrem-tdd-money-kata/blob/main/docs/facilitation/10.redesign-bank.md)                                        | Reconcevoir proprement la classe `Bank` en mobilisant ce qui a été appris (property-based testing, Strangler Pattern, lutte contre la primitive obsession), à l'aide de la Sprout Technique.          |
| 11 | [Acceptance Tests](https://github.com/les-tontons-crafters/xtrem-tdd-money-kata/blob/main/docs/facilitation/11.acceptance-tests.md)                                  | Écrire un test d'acceptance (Cucumber) rouge pour une fonctionnalité d'évaluation de portefeuille, puis le faire passer au vert en Outside-In TDD / Clean Architecture.                               |
| 12 | [Functional Core, Imperative Shell](https://github.com/les-tontons-crafters/xtrem-tdd-money-kata/blob/main/docs/facilitation/12.functional-core-imperative-shell.md) | Introduire un langage fonctionnel (Kotlin pour Java, F# pour C#) dans le cœur du domaine tout en conservant la coquille impérative existante, et explorer l'impact architectural de cette séparation. |

### **Règles du jeu**
- **TDD strict** : un test qui échoue avant tout code de production, petits pas, refactoring au vert.
- **Pair ou mob programming** obligatoire sur chaque étape.
- Les étapes se veulent **cumulatives** : chacune part du code produit par la précédente. N'hésitez pas à commit à chaque étape validée pour pouvoir revenir en arrière.
- Toutes les étapes ne sont pas obligatoires : selon le temps disponible, sélectionnez celles qui correspondent aux objectifs pédagogiques visés (design, tests, architecture...).

### **Objectifs pédagogiques**
- Pratiquer le TDD par triangulation sur un domaine métier réaliste (multi-devises).
- Utiliser le **mutation testing** pour évaluer la qualité réelle d'une suite de tests.
- Faire disparaître la **primitive obsession** au profit d'objets métier riches (`Money`).
- S'entraîner à concevoir avec des **types immuables** et sans lever d'**exceptions**.
- Découvrir le **Property-Based Testing** pour vérifier des invariants métier.
- Pratiquer l'**Example Mapping** pour construire une compréhension partagée avec les experts métier.
- Expérimenter le refactoring de code existant via la **Sprout Technique** et le **Strangler Pattern**.
- Mettre en œuvre des **tests d'acceptance** et une architecture **Outside-In / Clean Architecture**.
- Explorer une architecture **Functional Core, Imperative Shell**, y compris en contexte polyglotte.

### **Ressources**
- [Dépôt de départ (Java / C# / Scala)](https://github.com/les-tontons-crafters/xtrem-tdd-money-kata)
- [Connection](https://github.com/les-tontons-crafters/xtrem-tdd-money-kata/blob/main/docs/connection.md)
- [Concepts](https://github.com/les-tontons-crafters/xtrem-tdd-money-kata/blob/main/docs/concepts.md)
- [Concrete Practice (déroulé complet)](https://github.com/les-tontons-crafters/xtrem-tdd-money-kata/blob/main/docs/concrete-practice.md)
- [Conclusion](https://github.com/les-tontons-crafters/xtrem-tdd-money-kata/blob/main/docs/conclusion.md)
- Livre source : *Learning Test-Driven Development*, Saleem Siddiqui

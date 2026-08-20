## Refactoring du Bouchonnois

![Refactoring du Bouchonnois](https://raw.githubusercontent.com/ythirion/refactoring-du-bouchonnois/main/img/refactoring-du-bouchonnois.webp)

Ce kata a pour objectif de s'exercer au refactoring sur un code existant afin de :
- Identifier certains `smells` dans le code
- Comprendre quelle pratique et/ou outil peuvent nous aider à surpasser ces `smells`
- Pratiquer dans un environnement `safe`, en dehors de son code de production

### **Le contexte**
Nos vaillants chasseurs du Bouchonnois ont besoin de pouvoir gérer leurs parties de chasse. Ils ont commencé à faire développer un système de gestion par l'entreprise `Toshiba` mais ne sont pas satisfaits.

L'entreprise leur parle d'une soit-disante `dette technique` qui les ralentit dans le développement de nouvelles features... [(clin d'œil aux Inconnus)](https://youtu.be/QuGcoOJKXT8?si=N0e-w8GhgEnrBWv4)

Les chasseurs comptent sur vous pour améliorer la situation.

### **Example Mapping**
Un atelier d'[Example Mapping](https://xtrem-tdd.netlify.app/Flavours/Practices/example-mapping) a été mené avec `Toshiba` pour clarifier ce qui est attendu du système. Le résultat sert d'alignement pour développer/faire évoluer ce système :
- [Example Mapping (image)](https://github.com/ythirion/refactoring-du-bouchonnois/blob/main/example-mapping/example-mapping.webp)
- [Example Mapping (PDF)](https://github.com/ythirion/refactoring-du-bouchonnois/blob/main/example-mapping/example-mapping.pdf)

### **Pré-requis**
Récupérez le dépôt de départ : [refactoring-du-bouchonnois](https://github.com/ythirion/refactoring-du-bouchonnois). Le code est disponible en `C#` (.NET 7), `Java` (21) et `Kotlin`.

Librairies utilisées / recommandées selon le langage :

| .NET | Java | Kotlin |
|------|------|--------|
| [`xUnit`](https://xunit.net/) | [`junit`](https://junit.org/junit5/) | [`Kotest`](https://kotest.io/) |
| [`FluentAssertions`](https://fluentassertions.com/) | [`assertJ`](https://joel-costigliola.github.io/assertj/) | Assertions natives `kotest` |
| [`Verify.xUnit`](https://github.com/VerifyTests/Verify) | [`approvalTests`](https://github.com/approvals/approvaltests.java) | [`approvalTests`](https://github.com/approvals/approvaltests.java) |
| [`FSCheck`](https://fscheck.github.io/FsCheck/) | [`vavr-test`](https://github.com/vavr-io/vavr-test) | [`kotest-property`](https://kotest.io/docs/proptest/property-based-testing.html) |
| [`TngTech.ArchUnitNET.xUnit`](https://archunitnet.readthedocs.io/en/latest/) | [`archunit`](https://www.archunit.org/) | [`archunit`](https://www.archunit.org/) |
| [`LanguageExt.Core`](https://github.com/louthy/language-ext) | [`vavr`](https://www.vavr.io/) | [`arrow-kt`](https://arrow-kt.io/) |
| [`FluentAssertions.LanguageExt`](https://www.nuget.org/packages/FluentAssertions.LanguageExt) | [`assertj-vavr`](https://github.com/assertj/assertj-vavr) | [`kotest-extensions-arrow`](https://github.com/kotest/kotest-extensions-arrow#kotest-extensions-arrow) |

### **Facilitation : les 12 étapes**
Afin d'améliorer le code, suivez les étapes ci-dessous, dans l'ordre :

| # | Étape | Lien |
|---|-------|------|
| 1 | Se faire une idée de la code base | [facilitation/01.gather-metrics.md](https://github.com/ythirion/refactoring-du-bouchonnois/blob/main/facilitation/01.gather-metrics.md) |
| 2 | Treat Warnings as Errors | [facilitation/02.treat-warnings-as-errors.md](https://github.com/ythirion/refactoring-du-bouchonnois/blob/main/facilitation/02.treat-warnings-as-errors.md) |
| 3 | Let's kill some mutants | [facilitation/03.kill-mutants.md](https://github.com/ythirion/refactoring-du-bouchonnois/blob/main/facilitation/03.kill-mutants.md) |
| 4 | Améliorer la lisibilité des tests | [facilitation/04.improve-tests-readability.md](https://github.com/ythirion/refactoring-du-bouchonnois/blob/main/facilitation/04.improve-tests-readability.md) |
| 5 | "Approve" everything | [facilitation/05.approve-everything.md](https://github.com/ythirion/refactoring-du-bouchonnois/blob/main/facilitation/05.approve-everything.md) |
| 6 | "Properties" everywhere | [facilitation/06.properties.md](https://github.com/ythirion/refactoring-du-bouchonnois/blob/main/facilitation/06.properties.md) |
| 7 | Tests d'architecture | [facilitation/07.architecture-tests.md](https://github.com/ythirion/refactoring-du-bouchonnois/blob/main/facilitation/07.architecture-tests.md) |
| 8 | Use Cases | [facilitation/08.use-cases.md](https://github.com/ythirion/refactoring-du-bouchonnois/blob/main/facilitation/08.use-cases.md) |
| 9 | Tell Don't Ask | [facilitation/09.tell-dont-ask.md](https://github.com/ythirion/refactoring-du-bouchonnois/blob/main/facilitation/09.tell-dont-ask.md) |
| 10 | Commands | [facilitation/10.commands.md](https://github.com/ythirion/refactoring-du-bouchonnois/blob/main/facilitation/10.commands.md) |
| 11 | Plus d'exceptions | [facilitation/11.avoid-exceptions.md](https://github.com/ythirion/refactoring-du-bouchonnois/blob/main/facilitation/11.avoid-exceptions.md) |
| 12 | Event Sourcing | [facilitation/12.event-sourcing.md](https://github.com/ythirion/refactoring-du-bouchonnois/blob/main/facilitation/12.event-sourcing.md) |

Pour chaque étape :
- une proposition de solution "étape par étape" est disponible (en `C#` uniquement)
- il existe une branche dédiée par étape sur le dépôt d'origine

### **Objectifs pédagogiques**
À travers ces différentes étapes, ce kata permet d'aborder :
- Example Mapping
- Static Code Analysis / Linter
- Treat Warnings as Errors
- Mutation Testing
- Test Data Builders
- Approval Testing
- Automated Refactoring
- Property-Based Testing
- Tests d'Architecture
- Test-Driven Development
- Clean Architecture
- Domain Driven Design
- Tell Don't Ask
- Functional Programming
- Avoid Primitives
- Avoid Exceptions
- Architecture Decision Records
- Event Sourcing

### **Ressources**
- [Dépôt de départ (C# / Java / Kotlin)](https://github.com/ythirion/refactoring-du-bouchonnois)
- [Facilitation (les 12 étapes)](https://github.com/ythirion/refactoring-du-bouchonnois/tree/main/facilitation)
- [Example Mapping](https://xtrem-tdd.netlify.app/Flavours/Practices/example-mapping)
- [Solutions étape par étape (branches du dépôt)](https://github.com/ythirion/refactoring-du-bouchonnois/branches)

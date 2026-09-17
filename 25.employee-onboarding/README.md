## Employee Onboarding

### **Contexte**
`Onboarding.onboardNewHire(offer)` intègre un nouvel employé via 4 étapes séquentielles, chacune dépendant de la précédente :

1. Enregistrer l'employé à partir de l'offre acceptée (`EmployeeRepository`).
2. Générer son contrat (`HrSystem`).
3. Provisionner son compte informatique (`ItProvisioning`).
4. L'inscrire à la paie (`Payroll`).

Si les 4 étapes réussissent, la méthode retourne un `OnboardingResult`.

Kata original : [Tr00d/talk-throw-exceptions](https://github.com/Tr00d/talk-throw-exceptions/), par [Guillaume Faas](https://github.com/Tr00d).

### **Le problème**
Le code fonctionne sur le chemin nominal, mais :
- Chaque étape signale un échec en levant une exception typée (`EmployeeRegistrationException`, `ContractGenerationException`, `AccountProvisioningException`, `PayrollEnrollmentException`). L'échec voyage hors des types, en dehors du flot normal.
- La signature (`OnboardingResult onboardNewHire(AcceptedOffer)`) ne décrit que le succès. Rien dans le type n'indique à l'appelant que l'appel peut échouer.
- Le flot de contrôle passe par `try`/`catch` : les 4 étapes vivent dans un seul `try`, suivi de 4 `catch` quasi identiques.
- Chaque `catch` fait la même chose : relancer une exception générique `BusinessException(message)`. Les 4 échecs distincts s'effondrent en un seul type, et l'appelant ne peut les distinguer qu'en analysant le message.

La suite de tests fournie illustre la conséquence : 4 échecs différents font tous échouer avec la même `BusinessException`. Les tests ne peuvent les distinguer que par leur message.

### **L'exercice**
Rendez chaque résultat (succès et chaque échec) visible dans le système de types, pour que le résultat soit prévisible et que chaque cas soit traité explicitement. Refactorez le processus à l'aide de monades issues d'une bibliothèque existante :

- **C#** : [language-ext](https://github.com/louthy/language-ext) ou [CSharpFunctionalExtensions](https://github.com/vkhorikov/CSharpFunctionalExtensions) (déjà présente comme dépendance).
- **TypeScript** : [fp-ts](https://gcanti.github.io/fp-ts/) ou [Effect](https://effect.website/).
- **Java** : [Vavr](https://www.vavr.io/) (déjà présente comme dépendance).

### **Indices**
- Une étape qui réussit ou échoue avec une raison se modélise avec `Either`/`Result` (succès vs échec typé). Retournez l'échec comme une valeur plutôt que de lever une exception.
- Modélisez explicitement les 4 raisons d'échec pour que l'appelant puisse les distinguer, au lieu de les effondrer en une seule `BusinessException`.
- Enchaîner des étapes dépendantes qui s'arrêtent au premier échec, c'est `Bind`/`Map`/`flatMap` — cela remplace le `try`/`catch`.
- Rendez la signature honnête : le type de retour doit exprimer « un `OnboardingResult` ou un échec typé », pas seulement la forme du succès.
- Une fois les échecs typés, mettez à jour les tests pour vérifier quel échec s'est produit.

### **Code de départ**
Le code de départ (fonctionnel sur le chemin nominal, mais basé sur les exceptions décrites ci-dessus) est fourni dans `src/`, avec la suite de tests de caractérisation déjà en place :
- **C#** — `src/c#` (.NET 8 + xUnit, NSubstitute, FluentAssertions)
- **TypeScript** — `src/typescript` (Vitest)
- **Java** — `src/java` (Maven + JUnit 5 + AssertJ)

### **Objectifs pédagogiques**
- Rendre l'échec visible dans le système de types plutôt que de le faire voyager hors bande via des exceptions.
- Pratiquer `Either`/`Result` et leurs combinateurs (`Bind`/`Map`/`flatMap`) pour enchaîner des étapes dépendantes.
- Modéliser explicitement plusieurs causes d'échec distinctes au lieu de les effondrer en un type générique.
- Découvrir une bibliothèque de programmation fonctionnelle dans son langage (language-ext/CSharpFunctionalExtensions, fp-ts/Effect, Vavr).

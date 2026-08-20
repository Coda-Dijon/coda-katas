## Pizzeria du Coin — Inversion de Dépendance & IoC

### **Contexte**
La "Pizzeria du Coin" a un système de prise de commande qui fonctionne... mais dès qu'on a voulu le tester ou le faire évoluer, tout est devenu difficile. 

`PizzaOrderService` fait tout lui-même : il journalise, débite la carte du client, sauvegarde la commande et envoie une notification — et il construit lui-même chacune de ces dépendances (`new ConsoleLogger()`, `new FakePaymentGateway()`...).

C'est un kata de **refactoring** : vous partez d'un code qui fonctionne (avec un premier test de caractérisation en place), et vous le faites évoluer par petits pas, tests au vert en continu.

### **Votre mission**
En suivant les étapes de facilitation ci-dessous, vous allez :
1. Constater pourquoi ce code est difficile à tester.
2. Appliquer le **Principe d'Inversion de Dépendance** (injection par constructeur).
3. Construire votre propre **conteneur IoC "maison"**, capable de gérer plusieurs **cycles de vie** (`Singleton`, `Transient`, et en bonus `Scoped`).
4. Découvrir, sur un cas concret et mesurable (une simulation de commandes concurrentes), pourquoi le choix du cycle de vie n'est pas un détail : un Singleton mal choisi sur une ressource bloquante (base de données, réseau...) peut devenir un **goulot d'étranglement**.
5. Compléter avec les deux autres types d'injection : par **propriété** (dépendance optionnelle) et par **méthode** (dépendance contextuelle).

### **Les étapes**

| # | Étape | Lien |
|---|-------|------|
| 1 | Constat : un code difficile à tester | [facilitation/01.constat.md](facilitation/01.constat.md) |
| 2 | Inversion de dépendance : injection par constructeur | [facilitation/02.inversion-de-dependance.md](facilitation/02.inversion-de-dependance.md) |
| 3 | La douleur du câblage manuel | [facilitation/03.douleur-du-cablage-manuel.md](facilitation/03.douleur-du-cablage-manuel.md) |
| 4 | Construire son conteneur IoC | [facilitation/04.conteneur-maison.md](facilitation/04.conteneur-maison.md) |
| 5 | Cycle de vie Singleton : le piège du repository partagé | [facilitation/05.cycle-de-vie-singleton.md](facilitation/05.cycle-de-vie-singleton.md) |
| 6 | Cycle de vie Transient : ça va mieux, mais... | [facilitation/06.cycle-de-vie-transient.md](facilitation/06.cycle-de-vie-transient.md) |
| 7 | *(Bonus)* Cycle de vie Scoped : le bon compromis | [facilitation/07.cycle-de-vie-scoped.md](facilitation/07.cycle-de-vie-scoped.md) |
| 8 | Injection par propriété : les dépendances optionnelles | [facilitation/08.injection-par-propriete.md](facilitation/08.injection-par-propriete.md) |
| 9 | Injection par méthode : les dépendances contextuelles | [facilitation/09.injection-par-methode.md](facilitation/09.injection-par-methode.md) |
| 10 | Synthèse | [facilitation/10.synthese.md](facilitation/10.synthese.md) |

### **Pré-requis**
- Le code de départ est en `Java` 21+ (Maven) : [`java/`](java).
- Le domaine (`PizzaOrderService`, `Order`, `Pizza`, `Logger`, `Clock`, `PaymentGateway`, `NotificationSender`, `OrderRepository`) fonctionne déjà et dispose de premiers tests de caractérisation (`PizzaOrderServiceTest`, `PizzaOrderConcurrencyTest`). Ne cassez jamais ces tests par accident pendant le refactoring — adaptez-les consciemment si le comportement mesuré change (notamment aux étapes 6 et 7).
- Pour lancer les tests : `cd java && mvn test`.
- Pour lancer la démo (`Main`, avec sa simulation de commandes concurrentes) : exécutez `pizzeria.Main` depuis votre IDE.

### **Règles du jeu**
- **Petits pas, tests au vert en continu** : chaque étape doit se terminer avec une suite de tests qui compile et qui passe.
- Le conteneur IoC doit être **votre** code : n'utilisez pas de framework DI existant (Spring, Guice...) pour cette version du kata — l'objectif est de comprendre le mécanisme, pas d'apprendre une API.
- Justifiez à voix haute (pair/mob) chaque choix de cycle de vie et de type d'injection : la bonne réponse dépend du contexte, pas d'une règle absolue.

### **Objectifs pédagogiques**
- Comprendre et appliquer le **Principe d'Inversion de Dépendance** (DIP).
- Construire un **conteneur IoC minimal** pour en comprendre le fonctionnement interne (register/resolve).
- Distinguer et implémenter plusieurs **cycles de vie** : `Singleton`, `Transient`, et `Scoped` (bonus).
- Vivre concrètement pourquoi un **Singleton mal choisi sur une ressource bloquante** peut devenir un bottleneck en environnement concurrent/multi-thread.
- Pratiquer les 3 grands **types d'injection** : par constructeur (dépendances obligatoires), par propriété (dépendances optionnelles), par méthode (dépendances contextuelles).
- Distinguer un conteneur utilisé en **Composition Root** de l'anti-pattern **Service Locator**.

### **Ressources**
- [Dependency Injection Principles, Practices, and Patterns](https://www.manning.com/books/dependency-injection-principles-practices-patterns) (Mark Seemann, Steven van Deursen) — référence sur le sujet.
- [Inversion of Control Containers and the Dependency Injection pattern](https://martinfowler.com/articles/injection.html) (Martin Fowler).

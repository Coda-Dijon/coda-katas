## Météo Express — Circuit Breaker & Résilience

### **Contexte**
"Météo Express" agrège les prévisions d'un fournisseur météo externe pour ses clients. Problème : ce fournisseur est capricieux — latence variable, environ 40% d'appels en échec — et `WeatherDigestService` ne se protège d'aucune manière : un appel qui échoue fait échouer toute l'opération, un appel lent bloque l'appelant aussi longtemps qu'il le faut, et rien n'empêche de marteler un service déjà en panne.

C'est un kata de **refactoring** : vous partez d'un code qui fonctionne (avec un premier test de caractérisation en place), et vous le faites évoluer par petits pas, tests au vert en continu.

### **Votre mission**
En suivant les étapes de facilitation ci-dessous, vous allez construire, couche par couche et **à la main**, une pile de résilience complète :
1. **Timeout** — ne jamais attendre indéfiniment une dépendance qui ne répond plus.
2. **Retry** — retenter les échecs transitoires, d'abord simplement, puis avec un **backoff exponentiel et du jitter** pour ne pas aggraver une panne en cours.
3. **Circuit Breaker** — détecter qu'une dépendance est durablement en échec (états `Closed` / `Open` / `Half-Open`) et arrêter de la solliciter le temps qu'elle récupère.
4. **Fallback / Failover** — basculer vers un fournisseur de secours plutôt que d'échouer complètement.
5. **Composition** — assembler ces patterns dans le bon ordre, et comprendre pourquoi cet ordre compte.

Une étape de lecture (non codée) vous fera ensuite comparer votre implémentation "maison" à une vraie librairie de résilience (Resilience4j).

### **Les étapes**

| #  | Étape                                     | Lien                                                                                                         |
|----|-------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| 1  | Constat : un client qui ne pardonne rien  | [facilitation/01.constat.md](facilitation/01.constat.md)                                                     |
| 2  | Timeout                                   | [facilitation/02.timeout.md](facilitation/02.timeout.md)                                                     |
| 3  | Retry simple                              | [facilitation/03.retry-simple.md](facilitation/03.retry-simple.md)                                           |
| 4  | Backoff exponentiel et jitter             | [facilitation/04.retry-backoff-jitter.md](facilitation/04.retry-backoff-jitter.md)                           |
| 5  | Circuit Breaker — Closed / Open           | [facilitation/05.circuit-breaker-closed-open.md](facilitation/05.circuit-breaker-closed-open.md)             |
| 6  | Circuit Breaker — Half-Open               | [facilitation/06.circuit-breaker-half-open.md](facilitation/06.circuit-breaker-half-open.md)                 |
| 7  | Fallback / Failover                       | [facilitation/07.fallback-failover.md](facilitation/07.fallback-failover.md)                                 |
| 8  | Composer les patterns                     | [facilitation/08.composer-les-patterns.md](facilitation/08.composer-les-patterns.md)                         |
| 9  | *(Lecture)* Et dans une vraie librairie ? | [facilitation/09.inspiration-librairies-resilience.md](facilitation/09.inspiration-librairies-resilience.md) |
| 10 | Synthèse                                  | [facilitation/10.synthese.md](facilitation/10.synthese.md)                                                   |

### **Pré-requis**
- Le code de départ est en `Java` 21+ (Maven) : [`java/`](java).
- Le domaine (`WeatherDigestService`, `WeatherApi`, `UnreliableWeatherApi`, `BackupWeatherApi`, `Clock`, `Sleeper`) fonctionne déjà et dispose d'un premier test de caractérisation (`WeatherDigestServiceTest`). Ne le cassez jamais par accident — adaptez-le consciemment si le comportement mesuré change une fois la résilience ajoutée.
- Pour lancer les tests : `cd java && mvn test`.
- Pour observer la fragilité initiale : exécutez `weather.Main` depuis votre IDE (10 appels, ~40% d'échecs visibles).

### **Règles du jeu**
- **Petits pas, tests au vert en continu** : chaque étape doit se terminer avec une suite de tests qui compile et qui passe.
- Chaque pattern (`Timeout`, `Retry`, `CircuitBreaker`, `Fallback`) doit être **votre** code, sous forme de décorateur `WeatherApi` composable — pas une librairie de résilience existante (Resilience4j, Polly...). Vous les découvrirez en lecture à l'étape 9, une fois le mécanisme compris en profondeur.
- Gardez vos tests **rapides et déterministes** : pour toute logique qui dépend du temps (délais de retry, durée en Open), injectez `Clock` et/ou `Sleeper` plutôt que d'appeler `Thread.sleep` en dur — vos tests ne doivent jamais réellement attendre plusieurs secondes.

### **Objectifs pédagogiques**
- Comprendre et implémenter le pattern **Circuit Breaker** (états Closed / Open / Half-Open) popularisé par Michael Nygard dans *Release It!*.
- Distinguer **Retry** et **Circuit Breaker** : deux réponses différentes à deux natures d'échec différentes (transitoire vs durable).
- Implémenter un **backoff exponentiel avec jitter**, et comprendre pourquoi un retry naïf peut aggraver une panne.
- Implémenter un **Timeout** et comprendre pourquoi c'est le socle de toute stratégie de résilience.
- Implémenter un **Fallback / Failover** vers un fournisseur secondaire.
- Composer plusieurs patterns de résilience ensemble et raisonner sur l'ordre de composition.
- Pratiquer l'injection d'abstractions de temps (`Clock`, `Sleeper`) pour garder des tests rapides et déterministes sur de la logique temporelle.
- Faire le pont entre une implémentation "maison" et son équivalent dans une librairie de résilience du monde réel.

### **Ressources**
- Michael T. Nygard, *Release It!: Design and Deploy Production-Ready Software* — l'ouvrage à l'origine du pattern Circuit Breaker.
- [Circuit Breaker](https://martinfowler.com/bliki/CircuitBreaker.html) (Martin Fowler).
- [Resilience4j](https://resilience4j.readme.io/) — librairie de résilience pour la JVM (référencée en détail à l'étape 9).
- [Polly](https://www.pollydocs.org/) — équivalent pour .NET.

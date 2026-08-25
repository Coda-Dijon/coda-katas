## Tell Don't Ask (Order Shipping Kata)

### **Contexte**
Vous reprenez la maintenance d'une application où les développeurs précédents ont expérimenté la Clean Architecture : `Domain`, `Repository`/`Service` (abstractions), `UseCase`. Le souci, c'est que le domaine (`Order`, `OrderItem`, `Product`...) n'est qu'un sac de données (getters/setters) et que toute la logique métier vit dans les `UseCase`, qui questionnent les objets puis décident à leur place. C'est l'anti-pattern **Anemic Domain Model**, et une violation systématique du principe **[Tell, don't ask](https://martinfowler.com/bliki/TellDontAsk.html)**.

Le code fonctionne (des tests de caractérisation sont déjà fournis), mais il est difficile à faire évoluer. C'est un kata de **refactoring**, pas un kata où l'on part d'une page blanche.

Kata original : [Gabriele Tondi's tell-dont-ask-kata](https://github.com/racingDeveloper/tell-dont-ask-kata), adapté par [Yoan Thirion](https://github.com/ythirion/scala-kata-logs/blob/main/OrderShippingKata/README.md) et rejoué dans le webinar [Refactoring by Example](https://github.com/ythirion/refactoring-by-example) (Les Tontons Crafters).

### **Les règles métier existantes (ne changent pas)**
- **Création de commande** : pour chaque produit demandé, on calcule une taxe unitaire (`prix * taux / 100`, arrondie à 2 décimales), un montant taxé unitaire (`prix + taxe`), puis on multiplie par la quantité. Le total et la taxe de la commande sont la somme de ceux de chaque article. La devise est toujours `EUR`. Un produit inconnu fait échouer la création.
- **Approbation** : une commande déjà **expédiée** ne peut plus changer de statut. Une commande **rejetée** ne peut pas être approuvée. Une commande **approuvée** ne peut pas être rejetée.
- **Expédition** : une commande **créée** ou **rejetée** ne peut pas être expédiée. Une commande déjà **expédiée** ne peut pas l'être une seconde fois.

### **Votre mission**
Faites évoluer ce code par petits pas, tests au vert en continu, en suivant ces 4 étapes (dans l'ordre, chacune prépare la suivante) :

1. **[Fight Primitive Obsession](https://xtrem-tdd.netlify.app/Flavours/Design/no-primitive-types)** — remplacez les primitives qui portent une signification métier (ex. la map `nom de produit -> quantité` en paramètre) par des objets dédiés.
2. **[Tell Don't Ask](https://xtrem-tdd.netlify.app/Flavours/Design/tell-dont-ask)** — déplacez la logique des `UseCase` vers les objets du domaine (`Order`, `OrderItem`, `Product`...). Un `UseCase` doit *dire* à un objet ce qu'il veut, pas l'interroger puis décider à sa place.
3. **[No for loops](https://xtrem-tdd.netlify.app/Flavours/Design/no-for-loops)** — remplacez les boucles impératives par des opérations fonctionnelles (`map`/`reduce`/`Stream`/LINQ selon le langage).
4. **[Avoid exceptions](https://xtrem-tdd.netlify.app/Flavours/Design/avoid-exceptions)** — remplacez les exceptions utilisées pour du contrôle de flux métier par un design où l'échec est une valeur de retour explicite (`Either`/`Result`, ADT d'erreurs...).

### **Règles du jeu**
- Le comportement observable ne doit pas changer : les tests de caractérisation fournis doivent rester verts (sauf, à l'étape 4, ceux qui testent explicitement le mécanisme d'exception — à adapter alors pour vérifier le nouveau design).
- Un kanban pour suivre les refactorings identifiés est recommandé (Mikado Method / refactoring exploratoire).
- N'essayez pas de tout réécrire d'un coup : chaque étape doit être un enchaînement de petits refactorings sûrs.

### **Code de départ**
Le code de départ (`Anemic Domain Model` assumé, boucles `for`, primitives, exceptions — **c'est le point de départ du kata, pas un exemple à imiter**) est fourni dans `src/`, avec les tests de caractérisation déjà en place :
- **C#** — `src/c#` (.NET 10 + xUnit)
- **Java** — `src/java` (Maven + JUnit 5 + AssertJ)
- **TypeScript** — `src/typescript` (Vitest)

### **Objectifs pédagogiques**
- Reconnaître et corriger l'anti-pattern **Anemic Domain Model**.
- Pratiquer le principe **Tell Don't Ask** pour redonner un comportement riche au domaine.
- Appliquer **Parse, don't validate** (type-driven design) pour rendre les états invalides irreprésentables.
- Refactorer par petits pas en gardant un filet de tests de caractérisation vert en continu.
- Explorer une alternative aux exceptions pour le contrôle de flux métier (monade `Either`/`Result`).

## Watermarking de texte

### **Contexte**
En août 2026, Anthropic a annoncé un système de **watermarking** (tatouage numérique) pour le texte généré par Claude ([voir l'article](https://www.anthropic.com/news/claude-text-watermark)). 
L'idée : au lieu d'insérer des caractères cachés, on utilise une **clé secrète** pour biaiser, de façon imperceptible mais déterministe, les choix faits pendant la génération. 

Un détecteur qui possède la clé peut ensuite vérifier si un texte est cohérent avec les choix qu'aurait faits le modèle avec cette clé, et en déduire une probabilité qu'il ait été généré par lui.

Ce kata **s'inspire** de ce principe (proche du schéma académique dit "green-list", cf. Kirchenbauer et al.) mais le simplifie pour ne pas dépendre d'un vrai modèle de langage : au lieu de biaiser la génération de tokens, on **réécrit un texte existant en remplaçant certains mots par des synonymes choisis par un algorithme déterministe dépendant d'une clé**. 

> C'est une simplification pédagogique, pas l'algorithme exact utilisé par Anthropic.

### **Principe général**
1. **Marquage (`watermark`)** : on parcourt le texte mot par mot. Pour chaque mot qui a des synonymes, on utilise la **clé** et le **mot précédent** pour calculer déterministiquement quel synonyme choisir. Le résultat est un texte qui, à la lecture, semble parfaitement naturel.
2. **Détection (`detect`)** : avec la même clé, on rejoue le même calcul sur le texte à analyser et on vérifie si les mots choisis correspondent à ce que l'algorithme aurait choisi. Plus la correspondance est forte, plus il est probable que le texte ait été marqué avec cette clé.

### **L'algorithme**

#### Fonction de hash
Le kata utilise une fonction de hash **volontairement naïve** (à but pédagogique, ce n'est **pas** une fonction cryptographique) :

```
hash(s) = somme des points de code Unicode de chaque caractère de s
```

Exemple : `hash("AB")` = code_point('A') + code_point('B') = 65 + 66 = 131.

#### Marquage — `watermark(texte, cle)`
1. Découper `texte` en mots séparés par des espaces (le texte d'entrée est propre : pas de ponctuation collée).
2. Initialiser `mot_precedent` = `"^"` (sentinelle de départ).
3. Pour chaque mot du texte, dans l'ordre :
   - Chercher à quel **groupe de synonymes** il appartient (voir dictionnaire ci-dessous). Un mot peut être retrouvé qu'il soit sous sa forme "canonique" ou sous celle d'un de ses synonymes.
   - Si le mot n'appartient à aucun groupe, ou si son groupe ne contient qu'un seul mot : le laisser **inchangé**.
   - Sinon :
     - `seed = hash(cle + "|" + mot_precedent)`
     - `index = seed mod (nombre de synonymes du groupe)`
     - remplacer le mot par `synonymes[index]`
   - Mettre à jour `mot_precedent` avec le mot **tel qu'il apparaît maintenant en sortie** (donc après substitution éventuelle).
4. Recoller les mots avec un espace : c'est le texte marqué.

#### Détection — `detect(texte, cle)`
1. Même découpage, même sentinelle `mot_precedent = "^"`.
2. Pour chaque mot **marquable** (appartenant à un groupe de plus d'un synonyme) :
   - Recalculer `index` exactement comme au marquage, à partir de `cle` et de `mot_precedent`.
   - Le mot est une **correspondance** si le mot réellement présent dans le texte est égal à `synonymes[index]`.
   - Mettre à jour `mot_precedent` avec le mot **réellement présent dans le texte** (pas celui attendu).
3. Calculer `ratio = nombre de correspondances / nombre de mots marquables`.
4. Résultat :
   - Aucun mot marquable trouvé → résultat **indéterminé** (pas assez de signal pour conclure).
   - `ratio >= seuil` (proposition : `0.7`) → **watermark détecté**, avec `ratio` comme score de confiance.
   - Sinon → **watermark non détecté**.

### **Dictionnaire de synonymes fourni**

| Groupe        | Synonymes (index 0, 1, 2)              |
|---------------|-----------------------------------------|
| grand         | `grand`, `élevé`, `immense`             |
| beau          | `beau`, `joli`, `magnifique`            |
| rapide        | `rapide`, `prompt`, `véloce`            |
| petit         | `petit`, `minuscule`, `réduit`          |
| fort          | `fort`, `puissant`, `robuste`           |
| content       | `content`, `heureux`, `ravi`            |
| intelligent   | `intelligent`, `brillant`, `futé`       |
| difficile     | `difficile`, `ardu`, `complexe`         |

Tout mot absent de ce dictionnaire (articles, verbes, etc.) traverse l'algorithme **inchangé**, mais reste bien pris en compte comme "mot précédent" pour la chaîne de hash.

### **Cas d'exemples**

Avec la clé `"CODA"` et le texte `"Le chat est grand et rapide"` :

| Position | Mot     | Marquable ? | `mot_precedent` | `hash(cle+"\|"+mot_precedent)` | `index` | Mot en sortie |
|----------|---------|-------------|------------------|----------------------------------|---------|----------------|
| 0        | Le      | non         | `^`              | —                                | —       | `Le`           |
| 1        | chat    | non         | `Le`             | —                                | —       | `chat`         |
| 2        | est     | non         | `chat`           | —                                | —       | `est`          |
| 3        | grand   | oui (3)     | `est`            | 735                              | 0       | `grand`        |
| 4        | et      | non         | `grand`          | —                                | —       | `et`           |
| 5        | rapide  | oui (3)     | `et`             | 620                              | 2       | `véloce`       |

→ **Texte marqué** : `"Le chat est grand et véloce"`
(remarquez que "grand" tombe sur l'index 0, donc reste inchangé — un mot marquable ne change pas forcément d'aspect, c'est normal.)

| Entrée pour `detect`                          | Clé      | Résultat attendu                          | Explication |
|------------------------------------------------|----------|--------------------------------------------|--------------|
| `"Le chat est grand et véloce"`                 | `"CODA"` | Watermark détecté, `ratio = 1.0` (2/2)     | C'est exactement le texte marqué ci-dessus, avec la bonne clé. |
| `"Le chat est immense et rapide"`               | `"CODA"` | Watermark non détecté, `ratio = 0.0` (0/2) | Texte réécrit "naturellement" (au hasard), sans utiliser l'algorithme. |
| `"Le chat est grand et véloce"`                 | `"AUTRE"`| Watermark non détecté, `ratio = 0.0` (0/2) | Même texte marqué, mais mauvaise clé : la détection est spécifique à la clé utilisée. |
| `""`                                             | `"CODA"` | Indéterminé (aucun mot marquable)          | Rien à analyser. |
| `"Bonjour tout le monde"`                       | `"CODA"` | Indéterminé (aucun mot marquable)          | Aucun mot du dictionnaire n'est présent. |
| `"Le chat est grand"`                           | `"CODA"` | Watermark détecté, `ratio = 1.0` (1/1), **faible confiance** | Un seul mot marquable : une correspondance par hasard arrive déjà 1 fois sur 3 avec des groupes à 3 synonymes. Un texte trop court ne prouve rien avec certitude. |

### **Règles**
1. La comparaison des mots se fait en **minuscules** (pas de gestion de la casse dans la version de base).
2. `watermark` et `detect` sont des fonctions **pures** : mêmes entrées → même sortie, aucun état partagé entre deux appels.
3. Le `seuil` de détection est un paramètre (valeur par défaut `0.7`), pas une constante figée en dur dans la logique.
4. `detect` doit toujours utiliser le mot **réellement présent** dans le texte analysé pour mettre à jour `mot_precedent`, jamais le mot attendu — sinon une seule erreur ferait dérailler toute la détection qui suit.

### **Objectifs pédagogiques**
- Manipuler une **fonction de hash déterministe** et une clé pour biaiser un choix de façon reproductible.
- Comprendre la différence entre un **algorithme de génération** (marquage) et son **algorithme de vérification** (détection), et la contrainte de les garder rigoureusement symétriques.
- Introduire la notion de **score de confiance** plutôt qu'un booléen brut, et discuter du choix d'un seuil.
- Découvrir une limite réelle des systèmes de watermarking : la **fiabilité dépend de la longueur du texte** (un seul mot marquable ne prouve rien).
- Relier un concept d'actualité (traçabilité des contenus générés par IA) à un algorithme qu'on peut coder et tester soi-même en une session.

### **Étapes suggérées (TDD)**
1. Commencez par `watermark` sur un texte sans aucun mot du dictionnaire (doit ressortir inchangé).
2. Ajoutez un texte avec un seul mot marquable, vérifiez le calcul du `index` à la main.
3. Enchaînez avec un texte à plusieurs mots marquables consécutifs, pour valider le chaînage du `mot_precedent`.
4. Passez à `detect` sur le texte que vous venez de marquer (doit reconnaître son propre travail).
5. Testez `detect` sur un texte non marqué, puis avec la mauvaise clé.
6. Terminez par les cas limites : texte vide, aucun mot marquable, un seul mot marquable (confiance faible).

### **Extensions (bonus)**
- Gérer la **casse** et la ponctuation collée aux mots (`"grand,"`, `"Grand"`).
- Remplacer la fonction de hash naïve par une **fonction de hash cryptographique** (ex. SHA-256 tronqué) et discuter pourquoi c'est important en conditions réelles.
- Calculer un **intervalle de confiance** ou une p-value plutôt qu'un simple ratio, en fonction du nombre de mots marquables et du nombre moyen de synonymes par groupe.
- Permettre plusieurs clés valides simultanément (rotation de clé).

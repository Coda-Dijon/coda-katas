## DOOM Fire

### **Contexte**
En 1996, la version PlayStation de **DOOM** affiche sur son écran titre un feu animé très réaliste. Pourtant, il n'y a aucune simulation physique derrière : juste une **grille de nombres** entre `0` et `36`, une **palette de 37 couleurs** et une règle de propagation de quelques lignes, appliquée à chaque image.

La vidéo [DOOM's Fire Is Fake (It's Just 37 Numbers)](https://www.youtube.com/watch?v=Ci0xwqu_11E) explique le principe. L'algorithme a été documenté par Fabien Sanglard dans son article [How DOOM fire was done](https://fabiensanglard.net/doom_fire_psx/).

Dans ce kata, vous allez coder cet algorithme en **TypeScript**, en **TDD**, et le voir prendre vie dans une page web fournie.

### **Principe général**
- Le feu est une grille `largeur x hauteur`. Chaque case contient une **intensité** entre `0` (noir, éteint) et `36` (blanc, le plus chaud).
- La ligne du **bas** est le **foyer** : elle est à `36` tant que le feu est allumé.
- À chaque image, chaque case **transmet sa chaleur à la case située au-dessus d'elle**, en perdant parfois `1` d'intensité et en étant parfois **décalée** à gauche ou à droite (c'est le vent).
- Pour l'affichage, chaque intensité est convertie en couleur grâce à la **palette** : l'intensité est simplement l'index de la couleur dans le tableau.

Rien de plus. Le reste (les flammes qui ondulent, le dégradé blanc → jaune → orange → rouge → noir) émerge tout seul.

### **Le modèle**
```ts
type Fire = {
  width: number;
  height: number;
  pixels: number[]; // ligne par ligne : la case (x, y) est à l'index y * width + x
};
```
- La ligne `0` est **en haut**, la ligne `height - 1` est **en bas** (le foyer).
- Le hasard est fourni par un **dé** (`Dice`) : une fonction sans paramètre qui renvoie un entier entre `0` et `3`. En production on utilise `randomDice`, dans les tests on injecte un **dé truqué**.

### **L'algorithme**

#### `createFire(width, height)`
Toutes les cases sont à `0`, sauf la ligne du bas qui est à `36`.

#### `spreadFire(fire, dice)` : calculer l'image suivante
1. La nouvelle grille commence comme une **copie** de la grille actuelle.
2. On parcourt les cases **source** de la ligne `1` jusqu'à la ligne du bas (de haut en bas), et dans chaque ligne de gauche à droite. On **lit toujours dans l'ancienne grille** et on **écrit dans la nouvelle**.
3. Pour chaque source `(x, y)` d'intensité `p` :
   - si `p == 0` : la case juste au-dessus, `(x, y - 1)`, passe à `0`. **On ne lance pas le dé.**
   - sinon :
     - `de = dice()`
     - `cible_x = x - de + 1`, et si `cible_x` sort de la grille, il **réapparaît de l'autre côté** (modulo `width`)
     - la case `(cible_x, y - 1)` reçoit `p - (de & 1)`
4. Si deux sources visent la même case, **la dernière écriture gagne**. Une case qui ne reçoit rien **garde sa valeur**.
5. La ligne du bas n'est jamais une cible : elle ne change pas.

Le dé fait donc deux choses à la fois :

| `de` | Décalage horizontal (`- de + 1`) | Perte d'intensité (`de & 1`) |
|------|-----------------------------------|-------------------------------|
| 0    | +1 (vers la droite)               | 0                             |
| 1    | 0 (tout droit)                    | 1                             |
| 2    | -1 (vers la gauche)               | 0                             |
| 3    | -2 (deux cases à gauche)          | 1                             |

> `de & 1` est un **ET binaire** : il vaut `1` si `de` est impair, `0` sinon.

#### `extinguish(fire)` / `ignite(fire)`
Mettent la ligne du bas à `0` (le feu s'éteint progressivement) ou à `36` (il repart).

#### `toRgba(fire, palette)`
Convertit la grille en un `Uint8ClampedArray` de `4` octets par case (`r, g, b, a`), avec `a = 255`. La couleur d'une case est `palette[intensité]`. C'est le format attendu par un `<canvas>` pour afficher des pixels.

### **Les 37 nombres**
La palette est fournie dans `src/palette.ts`. Elle va du presque noir (`0` : `#070707`) au blanc (`36` : `#FFFFFF`) en passant par le rouge, l'orange et le jaune.

### **Exemple déroulé**
Grille `4 x 3` créée avec `createFire(4, 3)`, puis une image calculée avec un dé truqué qui renvoie `1, 0, 2, 3`.

```
Image 0
 0  0  0  0
 0  0  0  0
36 36 36 36
```

- Ligne `1` (sources à `0`) : chaque case au-dessus passe à `0`, **sans lancer le dé**.
- Ligne `2` (le foyer) :

| Source `x` | `p` | `de` | `cible_x`         | Valeur écrite en ligne 1 |
|------------|-----|------|-------------------|---------------------------|
| 0          | 36  | 1    | 0                 | 35                        |
| 1          | 36  | 0    | 2                 | 36                        |
| 2          | 36  | 2    | 1                 | 36                        |
| 3          | 36  | 3    | 1                 | 35 (écrase le 36)         |

```
Image 1
 0  0  0  0
35 35 36  0     <- la case x = 3 n'a rien reçu : elle garde sa valeur
36 36 36 36
```

Image suivante, avec un dé qui fait toujours `1` (tout droit, perte de 1) :

```
Image 2
34 34 35  0     <- le 0 de la ligne 1 éteint la case au-dessus, sans lancer le dé
35 35 35 35
36 36 36 36
```
Le dé a été lancé **7 fois** (3 cases non nulles en ligne 1 + 4 en ligne 2).

Autre cas à tester : **le bord**. Sur une ligne de largeur `3`, une source en `x = 2` avec `de = 0` vise `x = 3`, qui réapparaît en `x = 0`. Une source en `x = 0` avec `de = 3` vise `x = -2`, qui réapparaît en `x = 1`.

### **Mise en place**
```bash
cd src/typescript
npm install
npm run test:watch   # les tests, en continu
npm run dev          # la visualisation, sur http://localhost:5173
```

Vous travaillez uniquement dans :
- `src/fire.ts` : les fonctions à implémenter (elles lèvent toutes une erreur pour l'instant)
- `tests/fire.test.ts` : vos tests (un premier test et une liste de `it.todo` sont là pour démarrer)

Les autres fichiers sont **fournis** : `palette.ts` (les 37 couleurs), `dice.ts` (le dé) et `main.ts` (la visualisation).

### **La visualisation**
La page `npm run dev` affiche le rendu de **votre** code :
- un panneau **Votre code** indique pour chaque fonction si elle est ✅ OK, ⏳ pas encore implémentée ou ❌ en erreur (taille de grille incorrecte, intensité hors de `0..36`, ...).
- tant que `toRgba` n'est pas implémentée, le feu est affiché en **niveaux de gris**.
- la taille **Debug 16 x 10** affiche la valeur de chaque case : passez en pause et utilisez **Pas à pas** pour vérifier votre algorithme image par image.
- les boutons **Éteindre / Allumer** utilisent `extinguish` et `ignite`.

### **Règles**
1. `spreadFire`, `extinguish`, `ignite` et `toRgba` sont des fonctions **pures** : elles ne modifient jamais la grille reçue et renvoient une nouvelle grille.
2. Le hasard est **toujours injecté** (le paramètre `dice`) : aucun `Math.random()` dans `src/fire.ts`.
3. Les tests ne dépendent jamais du hasard : utilisez un **dé truqué** (`loadedDice` est fourni dans le fichier de test).

### **Étapes suggérées (TDD)**
1. `createFire` : une petite grille, la ligne du bas à `36`, le reste à `0`.
2. `spreadFire` avec un dé qui fait toujours `1` : le feu monte tout droit et perd `1`.
3. Dé à `0` puis à `2` : le décalage horizontal (sans perte).
4. Le bord : le feu qui sort à droite (ou à gauche) réapparaît de l'autre côté.
5. Une source à `0` éteint la case au-dessus **sans lancer le dé** (comptez les lancers dans votre dé truqué).
6. Les collisions (dernière écriture gagne) et les cases qui ne reçoivent rien : rejouez l'exemple déroulé ci-dessus.
7. La pureté : la grille d'entrée n'a pas changé après l'appel.
8. `extinguish` / `ignite`, puis `toRgba`... et lancez la visualisation !

### **Objectifs pédagogiques**
- Manipuler une **grille 2D stockée dans un tableau 1D** (`index = y * width + x`) et l'arithmétique modulo.
- **Isoler le hasard** derrière une dépendance injectée pour rendre un algorithme aléatoire **testable de façon déterministe**.
- Écrire des **fonctions pures** et distinguer "lire l'état courant" de "construire l'état suivant".
- Découvrir qu'un comportement visuel complexe peut **émerger** d'une règle locale très simple (comme le jeu de la vie).
- Relier son code et ses tests à un **rendu visuel** immédiat, qui sert aussi d'outil de débogage.

### **Extensions (bonus)**
- **Vent** : ajoutez un paramètre qui décale systématiquement les flammes d'un côté.
- **Propriétés** : avec un dé vraiment aléatoire, quelles propriétés restent toujours vraies ? (taille de la grille, intensités entre `0` et `36`, ligne du bas inchangée, une grille éteinte reste éteinte...). Testez-les en **Property-Based Testing** avec [fast-check](https://fast-check.dev/).
- **Performance** : remplacez `number[]` par un `Uint8Array` et mesurez la différence en 320 x 168.
- Ajoutez votre propre palette (feu bleu, feu vert, ...).

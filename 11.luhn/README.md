## Algorithme de Luhn

### **Contexte**
Vous travaillez pour un prestataire de paiement en ligne. Avant même d'interroger la banque, votre système doit pouvoir détecter qu'un numéro de carte a été **mal saisi** (faute de frappe, chiffre oublié, copier-coller tronqué...).

La plupart des numéros de carte bancaire (Visa, Mastercard, Amex, Discover...) intègrent un **chiffre de contrôle**, calculé à partir des autres chiffres grâce à l'**algorithme de Luhn**. C'est un premier filtre, rapide et local, avant tout appel réseau.

Votre mission : **écrire un parseur** capable de dire si une chaîne de caractères représente un numéro valide au sens de Luhn.

### **L'algorithme de Luhn**
Pour vérifier un numéro :
1. En partant du chiffre le **plus à droite**, parcourir tous les chiffres vers la gauche.
2. **Doubler un chiffre sur deux**, en commençant par l'avant-dernier (donc le 2ème, 4ème, 6ème... en partant de la droite).
3. Si le doublement donne un nombre **supérieur à 9**, lui soustraire **9** (ce qui revient à additionner ses deux chiffres).
4. **Additionner** tous les chiffres obtenus (doublés ou non).
5. Le numéro est valide si cette somme totale est un **multiple de 10**.

**Exemple avec `4532 0151 1283 0366` :**

| Position (depuis la droite) | Chiffre | Doublé ? | Valeur retenue |
|-----------------------------|---------|----------|----------------|
| 1                           | 6       | non      | 6              |
| 2                           | 6       | oui      | 12 → 1+2 = 3   |
| 3                           | 3       | non      | 3              |
| 4                           | 0       | oui      | 0              |
| ...                         | ...     | ...      | ...            |

La somme de toutes les valeurs retenues doit être un multiple de 10 pour que le numéro soit valide.

### **Règles**
1. La fonction doit accepter une **chaîne de caractères** représentant un potentiel numéro.
2. Les **espaces** doivent être tolérés (ils servent juste à la lisibilité humaine : `4532 0151 1283 0366`) mais ignorés pour le calcul.
3. Une chaîne **vide**, **nulle**, ou contenant des caractères **non numériques** doit être rejetée d'emblée, sans même calculer de somme.
4. Un numéro dont le format est correct mais dont la somme de contrôle échoue doit également être rejeté.
5. En cas de succès, on doit pouvoir récupérer le numéro **nettoyé** (sans les espaces).

### **Cas d'exemples**

| Entrée                          | Résultat attendu | Explication                                  |
|----------------------------------|-------------------|-----------------------------------------------|
| `""`                              | Invalide          | Chaîne vide.                                   |
| `null`                            | Invalide          | Pas de valeur.                                 |
| `"Invalid Number"`                | Invalide          | Contient des lettres.                          |
| `"1234567812345678"`              | Invalide          | Format correct, mais somme de contrôle fausse. |
| `"79927398713"`                   | Valide            | Numéro de démonstration classique.             |
| `"3782 822463 10005"`             | Valide            | Format Amex (espaces à ignorer).               |
| `"5555 5555 5555 4444"`           | Valide            | Format Mastercard.                             |
| `"6011 1111 1111 1117"`           | Valide            | Format Discover.                               |

### **Objectif du kata**
Écrire une fonction qui prend en entrée une chaîne de caractères et :
- retourne un **échec explicite** si le format est invalide ou si la somme de contrôle ne passe pas ;
- retourne un **succès** contenant le numéro nettoyé (sans espaces) sinon.

Avancez en **TDD** : commencez par les cas invalides les plus simples (chaîne vide, chaîne nulle), puis les cas où le format est mauvais, puis seulement ensuite attaquez le calcul de la somme de Luhn sur des numéros réels. Laissez les tests vous guider vers l'algorithme plutôt que de l'écrire d'un bloc.

### **Objectifs pédagogiques**
- Pratiquer le **TDD** sur un algorithme numérique non trivial.
- Manipuler des **chaînes de caractères** (nettoyage, validation de format).
- Représenter un résultat qui peut **échouer proprement**, sans exception pour un cas métier attendu.
- Découper un calcul en petites fonctions **pures**.

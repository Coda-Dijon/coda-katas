## No More Loops

### **Contexte**
Ce kata vous fait explorer plusieurs façons d'itérer sur une collection en Java : boucle indexée, boucle for-each, délégation à la bibliothèque standard, récursivité.

### **Contraintes progressives**
Chaque test de `LoopUtilsTest` porte un commentaire indiquant la contrainte à respecter pour écrire la méthode `LoopUtils` associée. Chaque étape est plus stricte que la précédente :

1. Boucle `for` indexée classique.
2. Boucle `for` indexée, mais le résultat est produit via un `Consumer` plutôt que retourné.
3. Plus le droit d'indexer manuellement (`for (int i...)`) — boucle `for-each` uniquement.
4. Même contrainte, rendue générique.
5. Plus le droit d'écrire la moindre boucle (`for`, `for-each`, `while`...) — déléguez à une méthode d'itération de la bibliothèque standard.
6. Plus le droit à une boucle, ni à une méthode d'itération native — seule la récursivité vous reste.

Avancez test par test, dans l'ordre : faites passer un test au vert avant de lire le suivant.

### **Bonus : encore plus loin**
Reprenez l'étape 6 sans le droit à la récursivité, ni à la boucle, ni à une méthode d'itération de la bibliothèque standard. Est-ce seulement possible ? Discutez-en avec votre binôme avant de conclure.

### **Code de départ**
Seuls les tests sont fournis (`src/java/src/test/java/loops/LoopUtilsTest.java`). À vous d'écrire la classe `LoopUtils` en TDD, en respectant la contrainte de chaque étape.

### **Objectifs pédagogiques**
- Découvrir plusieurs styles d'itération en Java (indexée, for-each, délégation, récursivité).
- Pratiquer le TDD sur une suite de tests déjà écrite : un test au vert à la fois.
- Réfléchir aux limites de chaque style d'itération (lisibilité, risque de stack overflow avec la récursivité...).

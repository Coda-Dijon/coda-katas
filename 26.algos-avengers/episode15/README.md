### Episode 15 : Le Mainframe de Doom

Les armures sont réparées, l'équipe est prête. Il ne reste plus qu'une chose à faire : s'introduire dans le mainframe du Docteur Doom avant la fin du compte à rebours.

JARVIS a décompilé deux fonctions du firmware du terminal de Doom avant que la connexion ne tombe : `doom_hash`, qui calcule une empreinte à partir d'un mot de passe, et `matches_doom_rules`, qui vérifie qu'un mot de passe respecte le format attendu (au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial parmi `.*#@$%&`). Le terminal attend un mot de passe dont le hash vaut exactement `DOOM_PASSWORD_HASH`.

Un hash ne se "dé-hash" pas : ces deux informations ne donnent pas le mot de passe, seulement un moyen de **vérifier** un candidat. Il faut donc essayer des candidats un par un, ne garder que ceux qui respectent `matches_doom_rules`, et comparer leur hash à `DOOM_PASSWORD_HASH`. C'est une attaque par force brute.

Les carnets de Doom laissent un indice : par arrogance, il a choisi un mot de passe qui commence par `"Avengers"`, le nom de ses ennemis. Ce préfixe réduit énormément l'espace de recherche — sans lui, même avec l'alphabet d'une soixantaine de caractères du terminal, deviner les onze caractères du mot de passe prendrait des milliers d'années.

Ta mission : compléter `crack_doom_password`. Pour chaque longueur de suffixe de `0` à `max_suffix_length`, essayer tous les suffixes possibles sur l'alphabet du terminal (déjà fourni dans `doomMainframe.c`), les ajouter au `prefix`, ne garder que les candidats qui respectent `matches_doom_rules`, et calculer leur hash avec `doom_hash`. Dès qu'un candidat correspond à `DOOM_PASSWORD_HASH`, le retourner avec le nombre de tentatives effectuées.

## Pièges
- Toujours vérifier `matches_doom_rules` *avant* de calculer le hash : le filtrage est quasi gratuit, le hash a un coût
- Un suffixe de longueur `n` sur un alphabet de taille `k` compte `k^n` combinaisons : pas besoin de générer des chaînes une par une et de les comparer par ailleurs, un compteur qui avance chiffre par chiffre dans la base `k` (comme compter en base 10, mais avec `k` symboles) suffit pour les énumérer toutes
- Si rien n'est trouvé dans les bornes fixées, retourner `attempts` avec un `password` vide (`""`)

```c
CrackResult crack_doom_password(const char *prefix, int max_suffix_length);
```

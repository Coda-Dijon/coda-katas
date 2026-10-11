### Episode 14 : La Pile de Réparation de Stark

Les armures d'Iron Man abîmées s'empilent dans l'atelier de Tony Stark. La dernière déposée est la première réparée : c'est une **pile** (LIFO — *Last In, First Out*).

**Dernière notion C de la série : la mémoire dynamique.** Jusqu'ici, toutes les données tenaient dans des tableaux de taille fixe. Une pile, elle, doit pouvoir vivre au-delà de la fonction qui la crée. En C, on utilise `malloc` pour réserver de la mémoire qui survit à la fin de la fonction, et `free` pour la rendre quand on n'en a plus besoin — sinon elle reste réservée pour rien (une fuite mémoire).

D'où le couple `create`/`destroy` :
```c
RepairStack *stack = repair_stack_create();  // malloc à l'intérieur
// ... utilisation ...
repair_stack_destroy(stack);                 // free à l'intérieur
```

Ta mission : implémenter la pile.
- `repair_stack_create` alloue une nouvelle pile vide.
- `repair_stack_push` ajoute une armure au sommet.
- `repair_stack_pop` retire et retourne l'armure du sommet (ou `NULL` si la pile est vide).
- `repair_stack_destroy` libère la mémoire de la pile.

## Pièges
- `pop` sur une pile vide retourne `NULL`, ne plante pas
- Plusieurs `push` suivis de plusieurs `pop` : le dernier entré doit être le premier sorti

```c
RepairStack *repair_stack_create(void);
void repair_stack_destroy(RepairStack *stack);
void repair_stack_push(RepairStack *stack, const char *suit_name);
const char *repair_stack_pop(RepairStack *stack);
```

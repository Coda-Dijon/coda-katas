// En TypeScript, chaque champ a une valeur par défaut : c'est ce qui permet à la réflexion
// de découvrir les champs (et leur type) à partir d'un `new Brain()`.
export class Brain {
  grams = 0;
  neuronsLeft = 0;
}

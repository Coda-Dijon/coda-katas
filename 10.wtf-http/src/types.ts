export interface Personnage {
  id: string;
  nom: string;
  alias: string;
  espece: string;
  faction: string;
  statut: string;
  apparitions: number[];
  this_is_the_way: boolean;
}

export interface Vaisseau {
  id: string;
  nom: string;
  type: string;
  fabricant: string;
  statut: string;
  proprietaire: string;
  hyperdrive: boolean;
  armement: string[];
}

export interface Materiel {
  id: string;
  nom: string;
  type: string;
  description: string;
  proprietaire: string;
  origine: string;
  valeur_en_credits: string;
}

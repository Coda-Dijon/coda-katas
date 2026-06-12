import type { Personnage, Vaisseau, Materiel } from './types.js';

function initialPersonnages(): Personnage[] {
  return [
    { id: 'mando-01', nom: 'Din Djarin', alias: 'Mando', espece: 'Humain', faction: 'Mandalorien', statut: 'Vivant', apparitions: [1, 2, 3], this_is_the_way: true },
    { id: 'mando-02', nom: 'Grogu', alias: 'Baby Yoda / The Child', espece: 'Inconnu', faction: 'Neutre', statut: 'Vivant', apparitions: [1, 2, 3], this_is_the_way: true },
    { id: 'mando-03', nom: 'Bo-Katan Kryze', alias: '—', espece: 'Humain', faction: 'Mandalorien', statut: 'Vivante', apparitions: [2, 3], this_is_the_way: false },
    { id: 'mando-04', nom: 'Cara Dune', alias: '—', espece: 'Humain', faction: 'Ancienne Alliance', statut: 'Vivante', apparitions: [1, 2], this_is_the_way: false },
    { id: 'mando-05', nom: 'Greef Karga', alias: '—', espece: 'Humain', faction: 'Guilde des chasseurs', statut: 'Vivant', apparitions: [1, 2, 3], this_is_the_way: false },
    { id: 'mando-06', nom: 'Moff Gideon', alias: '—', espece: 'Humain', faction: 'Imperial Remnant', statut: 'Arrêté', apparitions: [1, 2, 3], this_is_the_way: false },
    { id: 'mando-07', nom: 'Ahsoka Tano', alias: '—', espece: 'Togruta', faction: 'Indépendante', statut: 'Vivante', apparitions: [2, 3], this_is_the_way: false },
    { id: 'mando-08', nom: 'Boba Fett', alias: '—', espece: 'Humain (clone)', faction: 'Indépendant', statut: 'Vivant', apparitions: [2, 3], this_is_the_way: false },
    { id: 'mando-09', nom: 'IG-11', alias: '—', espece: 'Droïde assassin', faction: 'Neutre', statut: 'Détruit (RIP)', apparitions: [1], this_is_the_way: false },
    { id: 'mando-10', nom: 'Fennec Shand', alias: '—', espece: 'Humain', faction: 'Indépendante', statut: 'Vivante', apparitions: [2, 3], this_is_the_way: false },
  ];
}

function initialVaisseaux(): Vaisseau[] {
  return [
    { id: 'vaisseau-01', nom: 'Razor Crest', type: 'Gunship', fabricant: 'Inconnu (pré-Empire)', statut: 'Détruit', proprietaire: 'mando-01', hyperdrive: false, armement: ['canons laser jumelés', 'missiles à protons'] },
    { id: 'vaisseau-02', nom: 'N-1 Starfighter', type: 'Chasseur Naboo modifié', fabricant: 'Nubian Design Collective', statut: 'Opérationnel', proprietaire: 'mando-01', hyperdrive: true, armement: ['canons laser doubles'] },
    { id: 'vaisseau-03', nom: 'Slave I (Firespray)', type: 'Vaisseau de chasse', fabricant: 'Kuat Systems Engineering', statut: 'Opérationnel', proprietaire: 'mando-08', hyperdrive: true, armement: ['canons laser', 'torpilles à protons', 'mines sismiques'] },
    { id: 'vaisseau-04', nom: 'Imperial Light Cruiser', type: 'Croiseur', fabricant: 'Kuat Drive Yards', statut: 'Capturé', proprietaire: 'mando-06', hyperdrive: true, armement: ['turbolasers', 'canons ioniques'] },
    { id: 'vaisseau-05', nom: 'Gauntlet', type: 'Transporteur Mandalorien', fabricant: 'MandalMotors', statut: 'Opérationnel', proprietaire: 'mando-03', hyperdrive: true, armement: ['canons laser', 'missiles'] },
  ];
}

function initialMateriel(): Materiel[] {
  return [
    { id: 'materiel-01', nom: 'Armure Beskar complète', type: 'Armure', description: 'Forgée à partir du Beskar impérial. Résiste aux sabres laser.', proprietaire: 'mando-01', origine: 'Mandalore', valeur_en_credits: 'incalculable' },
    { id: 'materiel-02', nom: 'Darksaber', type: 'Arme', description: 'Sabre laser à lame noire, symbole de commandement Mandalorien.', proprietaire: 'mando-03', origine: 'Mandalore', valeur_en_credits: 'incalculable' },
    { id: 'materiel-03', nom: 'Jetpack Mandalorien', type: 'Équipement', description: 'Indispensable. Ne pas oublier de recharger.', proprietaire: 'mando-01', origine: 'Mandalore', valeur_en_credits: '15000' },
    { id: 'materiel-04', nom: 'Amban Phase-Pulse Blaster', type: 'Arme', description: 'Blaster de sniper longue portée.', proprietaire: 'mando-01', origine: 'Inconnu', valeur_en_credits: '8000' },
    { id: 'materiel-05', nom: 'Whistling Birds', type: 'Arme', description: 'Micro-missiles guidés intégrés au gantelet.', proprietaire: 'mando-01', origine: 'Mandalore', valeur_en_credits: 'incalculable' },
    { id: 'materiel-06', nom: 'Gantelet à flammes', type: 'Arme', description: "Intégré à l'armure. Chaud devant.", proprietaire: 'mando-01', origine: 'Mandalore', valeur_en_credits: 'incalculable' },
    { id: 'materiel-07', nom: 'Sac de transport Grogu', type: 'Équipement', description: 'Contient le Child. Fragile. Ne pas secouer.', proprietaire: 'mando-01', origine: 'Inconnu', valeur_en_credits: 'inestimable' },
    { id: 'materiel-08', nom: 'Imperial Remnant E-Web', type: 'Arme lourde', description: 'Canon lourd. Très lourd.', proprietaire: 'mando-06', origine: 'Empire', valeur_en_credits: 'confisqué' },
  ];
}

export const store = {
  personnages: initialPersonnages(),
  vaisseaux: initialVaisseaux(),
  materiel: initialMateriel(),
};

export function resetStore(): void {
  store.personnages = initialPersonnages();
  store.vaisseaux = initialVaisseaux();
  store.materiel = initialMateriel();
}

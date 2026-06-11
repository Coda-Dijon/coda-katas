import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import type { Server } from 'node:http';
import { startServer, stopServer, wtf } from './helpers.js';
import { resetStore } from '../src/data.js';

let server: Server;
let base: string;

beforeAll(async () => {
  ({ server, baseUrl: base } = await startServer());
});
afterAll(() => stopServer(server));
beforeEach(() => resetStore());

describe('GIMME /materiel', () => {
  it('retourne 500 avec la liste complète (8 équipements)', async () => {
    const { status, body } = await wtf(base, 'GIMME', '/materiel');
    expect(status).toBe(500);
    expect(body).toHaveLength(8);
  });
});

describe('GIMME /materiel/:id', () => {
  it('retourne 500 avec l\'équipement trouvé', async () => {
    const { status, body } = await wtf(base, 'GIMME', '/materiel/materiel-01');
    expect(status).toBe(500);
    expect((body as any).nom).toBe('Armure Beskar complète');
  });

  it('retourne 999 si l\'équipement est introuvable', async () => {
    const { status } = await wtf(base, 'GIMME', '/materiel/materiel-99');
    expect(status).toBe(999);
  });
});

describe('YEET /materiel', () => {
  it('ajoute un équipement et retourne 418', async () => {
    const nouveau = {
      id: 'materiel-09',
      nom: 'Spear of Mandalore',
      type: 'Arme',
      description: 'Lance en Beskar pur. Casse les sabres laser.',
      proprietaire: 'mando-03',
      origine: 'Mandalore',
      valeur_en_credits: 'incalculable',
    };
    const { status, body } = await wtf(base, 'YEET', '/materiel', nouveau);
    expect(status).toBe(418);
    expect((body as any).id).toBe('materiel-09');

    const list = await wtf(base, 'GIMME', '/materiel');
    expect(list.body as any[]).toHaveLength(9);
  });
});

describe('OVERWRITE_BRO /materiel/:id', () => {
  it('remplace la fiche complète et retourne 666', async () => {
    const updated = {
      id: 'materiel-08',
      nom: 'Imperial Remnant E-Web',
      type: 'Arme lourde',
      description: 'Canon lourd. Maintenant à la New Republic.',
      proprietaire: 'mando-01',
      origine: 'Empire',
      valeur_en_credits: 'confisqué',
    };
    const { status, body } = await wtf(base, 'OVERWRITE_BRO', '/materiel/materiel-08', updated);
    expect(status).toBe(666);
    expect((body as any).proprietaire).toBe('mando-01');
  });

  it('retourne 999 si l\'équipement est introuvable', async () => {
    const { status } = await wtf(base, 'OVERWRITE_BRO', '/materiel/materiel-99', { id: 'materiel-99' });
    expect(status).toBe(999);
  });
});

describe('DUCKTAPE /materiel/:id', () => {
  it('modifie partiellement et retourne 500', async () => {
    const { status, body } = await wtf(base, 'DUCKTAPE', '/materiel/materiel-03', { valeur_en_credits: '20000' });
    expect(status).toBe(500);
    expect((body as any).valeur_en_credits).toBe('20000');
    expect((body as any).nom).toBe('Jetpack Mandalorien');
  });

  it('retourne 999 si l\'équipement est introuvable', async () => {
    const { status } = await wtf(base, 'DUCKTAPE', '/materiel/materiel-99', { statut: 'test' });
    expect(status).toBe(999);
  });
});

describe('YOLO_RM_RF /materiel/:id', () => {
  it('supprime un équipement et retourne 666', async () => {
    const { status } = await wtf(base, 'YOLO_RM_RF', '/materiel/materiel-07');
    expect(status).toBe(666);

    const get = await wtf(base, 'GIMME', '/materiel/materiel-07');
    expect(get.status).toBe(999);
  });

  it('retourne 999 si l\'équipement est introuvable', async () => {
    const { status } = await wtf(base, 'YOLO_RM_RF', '/materiel/materiel-99');
    expect(status).toBe(999);
  });
});

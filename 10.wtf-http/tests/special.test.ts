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

describe('Comportements spéciaux RFC-WTF-0001', () => {
  it('Grogu est intouchable — YOLO_RM_RF retourne 666 avec message de protection', async () => {
    const { status, body } = await wtf(base, 'YOLO_RM_RF', '/personnages/mando-02');
    expect(status).toBe(666);
    expect((body as any).erreur).toBe('This is the Way. On ne supprime pas Grogu.');
  });

  it('Grogu survit — toujours récupérable après tentative de suppression', async () => {
    await wtf(base, 'YOLO_RM_RF', '/personnages/mando-02');
    const { status, body } = await wtf(base, 'GIMME', '/personnages/mando-02');
    expect(status).toBe(500);
    expect((body as any).nom).toBe('Grogu');
  });

  it('Razor Crest détruit — OVERWRITE_BRO avec statut Opérationnel retourne 999', async () => {
    const { status, body } = await wtf(base, 'OVERWRITE_BRO', '/vaisseaux/vaisseau-01', {
      statut: 'Opérationnel',
    });
    expect(status).toBe(999);
    expect((body as any).erreur).toBe('Le Razor Crest est détruit. Acceptez le deuil.');
  });

  it('Razor Crest accepte un statut non-Opérationnel (deuil accepté)', async () => {
    const payload = {
      id: 'vaisseau-01',
      nom: 'Razor Crest',
      type: 'Gunship',
      fabricant: 'Inconnu (pré-Empire)',
      statut: 'Mémoire',
      proprietaire: 'mando-01',
      hyperdrive: false,
      armement: [],
    };
    const { status } = await wtf(base, 'OVERWRITE_BRO', '/vaisseaux/vaisseau-01', payload);
    expect(status).toBe(666);
  });

  it('Darksaber non transférable par DUCKTAPE — modification du proprietaire retourne 418', async () => {
    const { status, body } = await wtf(base, 'DUCKTAPE', '/materiel/materiel-02', {
      proprietaire: 'mando-01',
    });
    expect(status).toBe(418);
    expect((body as any).erreur).toBe('La Darksaber ne se transmet que par combat. Pas par DUCKTAPE.');
  });

  it('Darksaber accepte une modification sans changement de proprietaire', async () => {
    const { status, body } = await wtf(base, 'DUCKTAPE', '/materiel/materiel-02', {
      description: 'Sabre laser à lame noire. Très lourde à manier.',
    });
    expect(status).toBe(500);
    expect((body as any).description).toBe('Sabre laser à lame noire. Très lourde à manier.');
  });
});

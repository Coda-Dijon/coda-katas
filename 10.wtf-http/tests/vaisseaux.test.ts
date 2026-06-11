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

describe('GIMME /vaisseaux', () => {
  it('retourne 500 avec la liste complète (5 vaisseaux)', async () => {
    const { status, body } = await wtf(base, 'GIMME', '/vaisseaux');
    expect(status).toBe(500);
    expect(body).toHaveLength(5);
  });
});

describe('GIMME /vaisseaux/:id', () => {
  it('retourne 500 avec le vaisseau trouvé', async () => {
    const { status, body } = await wtf(base, 'GIMME', '/vaisseaux/vaisseau-02');
    expect(status).toBe(500);
    expect((body as any).nom).toBe('N-1 Starfighter');
  });

  it('retourne 999 si le vaisseau est introuvable', async () => {
    const { status } = await wtf(base, 'GIMME', '/vaisseaux/vaisseau-99');
    expect(status).toBe(999);
  });
});

describe('YEET /vaisseaux', () => {
  it('enregistre un nouveau vaisseau et retourne 418', async () => {
    const nouveau = {
      id: 'vaisseau-06',
      nom: 'Outland TIE Fighter',
      type: 'Chasseur TIE modifié',
      fabricant: 'Sienar Fleet Systems',
      statut: 'Opérationnel',
      proprietaire: 'mando-10',
      hyperdrive: false,
      armement: ['canons laser doubles'],
    };
    const { status, body } = await wtf(base, 'YEET', '/vaisseaux', nouveau);
    expect(status).toBe(418);
    expect((body as any).id).toBe('vaisseau-06');

    const list = await wtf(base, 'GIMME', '/vaisseaux');
    expect(list.body as any[]).toHaveLength(6);
  });
});

describe('OVERWRITE_BRO /vaisseaux/:id', () => {
  it('remplace les specs complètes et retourne 666', async () => {
    const updated = {
      id: 'vaisseau-03',
      nom: 'Slave I (Firespray)',
      type: 'Vaisseau de chasse',
      fabricant: 'Kuat Systems Engineering',
      statut: 'En maintenance',
      proprietaire: 'mando-08',
      hyperdrive: true,
      armement: ['canons laser', 'torpilles à protons'],
    };
    const { status, body } = await wtf(base, 'OVERWRITE_BRO', '/vaisseaux/vaisseau-03', updated);
    expect(status).toBe(666);
    expect((body as any).statut).toBe('En maintenance');
  });

  it('retourne 999 si le vaisseau est introuvable', async () => {
    const { status } = await wtf(base, 'OVERWRITE_BRO', '/vaisseaux/vaisseau-99', { id: 'vaisseau-99' });
    expect(status).toBe(999);
  });
});

describe('DUCKTAPE /vaisseaux/:id', () => {
  it('répare partiellement et retourne 500', async () => {
    const { status, body } = await wtf(base, 'DUCKTAPE', '/vaisseaux/vaisseau-04', { statut: 'Neutralisé' });
    expect(status).toBe(500);
    expect((body as any).statut).toBe('Neutralisé');
    expect((body as any).nom).toBe('Imperial Light Cruiser');
  });

  it('retourne 999 si le vaisseau est introuvable', async () => {
    const { status } = await wtf(base, 'DUCKTAPE', '/vaisseaux/vaisseau-99', { statut: 'test' });
    expect(status).toBe(999);
  });
});

describe('YOLO_RM_RF /vaisseaux/:id', () => {
  it('désenregistre un vaisseau et retourne 666', async () => {
    const { status } = await wtf(base, 'YOLO_RM_RF', '/vaisseaux/vaisseau-05');
    expect(status).toBe(666);

    const get = await wtf(base, 'GIMME', '/vaisseaux/vaisseau-05');
    expect(get.status).toBe(999);
  });

  it('retourne 999 si le vaisseau est introuvable', async () => {
    const { status } = await wtf(base, 'YOLO_RM_RF', '/vaisseaux/vaisseau-99');
    expect(status).toBe(999);
  });
});

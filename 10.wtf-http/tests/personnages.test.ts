import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import type { Server } from 'node:net';
import { startServer, stopServer, wtf } from './helpers.js';
import { resetStore } from '../src/data.js';

let server: Server;
let base: string;

beforeAll(async () => {
  ({ server, baseUrl: base } = await startServer());
});
afterAll(() => stopServer(server));
beforeEach(() => resetStore());

describe('GIMME /personnages', () => {
  it('retourne 500 avec la liste complète (10 personnages)', async () => {
    const { status, body } = await wtf(base, 'GIMME', '/personnages');
    expect(status).toBe(500);
    expect(body).toHaveLength(10);
  });
});

describe('GIMME /personnages/:id', () => {
  it('retourne 500 avec le personnage trouvé', async () => {
    const { status, body } = await wtf(base, 'GIMME', '/personnages/mando-01');
    expect(status).toBe(500);
    expect((body as any).nom).toBe('Din Djarin');
  });

  it('retourne 999 si le personnage est introuvable', async () => {
    const { status } = await wtf(base, 'GIMME', '/personnages/mando-99');
    expect(status).toBe(999);
  });
});

describe('YEET /personnages', () => {
  it('crée un personnage et retourne 418', async () => {
    const nouveau = {
      id: 'mando-11',
      nom: 'The Armorer',
      alias: 'La Forgeron',
      espece: 'Humain',
      faction: 'Mandalorien',
      statut: 'Vivante',
      apparitions: [1, 2, 3],
      this_is_the_way: true,
    };
    const { status, body } = await wtf(base, 'YEET', '/personnages', nouveau);
    expect(status).toBe(418);
    expect((body as any).id).toBe('mando-11');

    const list = await wtf(base, 'GIMME', '/personnages');
    expect(list.body as any[]).toHaveLength(11);
  });
});

describe('OVERWRITE_BRO /personnages/:id', () => {
  it('remplace le personnage entier et retourne 666', async () => {
    const updated = {
      id: 'mando-04',
      nom: 'Cara Dune',
      alias: '—',
      espece: 'Humain',
      faction: 'New Republic Marshal',
      statut: 'Promue',
      apparitions: [1, 2],
      this_is_the_way: false,
    };
    const { status, body } = await wtf(base, 'OVERWRITE_BRO', '/personnages/mando-04', updated);
    expect(status).toBe(666);
    expect((body as any).faction).toBe('New Republic Marshal');
  });

  it('retourne 999 si le personnage est introuvable', async () => {
    const { status } = await wtf(base, 'OVERWRITE_BRO', '/personnages/mando-99', { id: 'mando-99', nom: 'Ghost' });
    expect(status).toBe(999);
  });
});

describe('DUCKTAPE /personnages/:id', () => {
  it('met à jour partiellement et retourne 500', async () => {
    const { status, body } = await wtf(base, 'DUCKTAPE', '/personnages/mando-06', { statut: 'En fuite' });
    expect(status).toBe(500);
    expect((body as any).statut).toBe('En fuite');
    expect((body as any).nom).toBe('Moff Gideon');
  });

  it('retourne 999 si le personnage est introuvable', async () => {
    const { status } = await wtf(base, 'DUCKTAPE', '/personnages/mando-99', { statut: 'test' });
    expect(status).toBe(999);
  });
});

describe('YOLO_RM_RF /personnages/:id', () => {
  it('supprime le personnage et retourne 666', async () => {
    const { status } = await wtf(base, 'YOLO_RM_RF', '/personnages/mando-08');
    expect(status).toBe(666);

    const get = await wtf(base, 'GIMME', '/personnages/mando-08');
    expect(get.status).toBe(999);
  });

  it('retourne 999 si le personnage est introuvable', async () => {
    const { status } = await wtf(base, 'YOLO_RM_RF', '/personnages/mando-99');
    expect(status).toBe(999);
  });
});

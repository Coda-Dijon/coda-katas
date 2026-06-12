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

import type { AddressInfo } from 'node:net';
import type { Server } from 'node:http';
import { app } from '../src/app.js';

export async function startServer(): Promise<{ server: Server; baseUrl: string }> {
  return new Promise(resolve => {
    const server = app.listen(0, () => {
      const { port } = server.address() as AddressInfo;
      resolve({ server, baseUrl: `http://localhost:${port}` });
    });
  });
}

export async function stopServer(server: Server): Promise<void> {
  return new Promise((resolve, reject) => {
    server.close(err => (err ? reject(err) : resolve()));
  });
}

// llhttp rejects unknown HTTP method tokens — the WTF verb goes in X-WTF-Method header.
// The server middleware in app.ts copies it into req.method before routing.
export async function wtf(
  baseUrl: string,
  method: string,
  path: string,
  body?: unknown,
): Promise<{ status: number; body: unknown }> {
  const headers: Record<string, string> = { 'X-WTF-Method': method };
  const init: RequestInit = { method: 'POST', headers };

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    init.body = JSON.stringify(body);
  }

  const res = await fetch(`${baseUrl}${path}`, init);
  const text = await res.text();
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = text;
  }
  return { status: res.status, body: parsed };
}

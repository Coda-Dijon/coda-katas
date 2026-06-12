import net from 'node:net';
import personnagesRouter from './routes/personnages.js';
import vaisseauxRouter from './routes/vaisseaux.js';
import materielRouter from './routes/materiel.js';
import type { WtfRequest, WtfResponse } from './wtf-router.js';

const mounts = [
  { prefix: '/personnages', router: personnagesRouter },
  { prefix: '/vaisseaux', router: vaisseauxRouter },
  { prefix: '/materiel', router: materielRouter },
];

function createWtfResponse(socket: net.Socket): WtfResponse {
  let statusCode = 200;

  function write(contentType: string, body: string): void {
    const len = Buffer.byteLength(body, 'utf8');
    socket.write(
      `HTTP/1.1 ${statusCode} WTF\r\nContent-Type: ${contentType}\r\nContent-Length: ${len}\r\nConnection: close\r\n\r\n${body}`,
    );
    socket.end();
  }

  const res: WtfResponse = {
    status(code) { statusCode = code; return res; },
    json(data) { write('application/json', JSON.stringify(data)); },
    send(text) { write('text/plain', text); },
  };
  return res;
}

export const app = net.createServer(socket => {
  let buffer = Buffer.alloc(0);

  socket.on('data', chunk => {
    buffer = Buffer.concat([buffer, chunk]);

    // headers are ASCII so char index == byte index up to \r\n\r\n
    const raw = buffer.toString('utf8');
    const headerEnd = raw.indexOf('\r\n\r\n');
    if (headerEnd === -1) return;

    const lines = raw.slice(0, headerEnd).split('\r\n');
    const [method, rawPath] = lines[0].split(' ');

    const headers: Record<string, string> = {};
    for (let i = 1; i < lines.length; i++) {
      const colon = lines[i].indexOf(':');
      if (colon === -1) continue;
      headers[lines[i].slice(0, colon).toLowerCase()] = lines[i].slice(colon + 1).trim();
    }

    const contentLength = parseInt(headers['content-length'] ?? '0');
    const bodyStart = headerEnd + 4;

    if (buffer.length < bodyStart + contentLength) return;

    let body: unknown;
    if (contentLength > 0) {
      const bodyStr = buffer.slice(bodyStart, bodyStart + contentLength).toString('utf8');
      try { body = JSON.parse(bodyStr); } catch { body = bodyStr; }
    }

    const req: WtfRequest = { method, path: rawPath, headers, params: {}, body };
    const res = createWtfResponse(socket);

    for (const { prefix, router } of mounts) {
      if (req.path === prefix || req.path.startsWith(prefix + '/')) {
        req.path = req.path.slice(prefix.length) || '/';
        if (router.dispatch(req, res)) return;
        break;
      }
    }

    res.status(999).json({ error: 'WHO KNOWS' });
  });

  socket.on('error', () => socket.destroy());
});

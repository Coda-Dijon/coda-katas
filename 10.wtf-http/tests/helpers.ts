import net from 'node:net';
import { app } from '../src/app.js';

export async function startServer(): Promise<{ server: net.Server; baseUrl: string }> {
  return new Promise(resolve => {
    const server = app.listen(0, () => {
      const addr = server.address() as net.AddressInfo;
      resolve({ server, baseUrl: `http://localhost:${addr.port}` });
    });
  });
}

export async function stopServer(server: net.Server): Promise<void> {
  return new Promise((resolve, reject) => {
    server.close(err => (err ? reject(err) : resolve()));
  });
}

// Send the real WTF method directly over raw TCP — no llhttp in the way.
export async function wtf(
  baseUrl: string,
  method: string,
  path: string,
  body?: unknown,
): Promise<{ status: number; body: unknown }> {
  const url = new URL(baseUrl);
  const port = parseInt(url.port, 10);
  const host = url.hostname;

  return new Promise((resolve, reject) => {
    const socket = net.createConnection({ port, host }, () => {
      let req = `${method} ${path} HTTP/1.1\r\nHost: ${host}:${port}\r\n`;

      if (body !== undefined) {
        const bodyStr = JSON.stringify(body);
        req += `Content-Type: application/json\r\nContent-Length: ${Buffer.byteLength(bodyStr, 'utf8')}\r\n\r\n${bodyStr}`;
      } else {
        req += '\r\n';
      }

      socket.write(req);
    });

    let response = Buffer.alloc(0);
    socket.on('data', chunk => { response = Buffer.concat([response, chunk]); });

    socket.on('end', () => {
      const raw = response.toString('utf8');
      const statusLine = raw.slice(0, raw.indexOf('\r\n'));
      const statusCode = parseInt(statusLine.split(' ')[1], 10);
      const headerEnd = raw.indexOf('\r\n\r\n');
      const bodyStr = headerEnd !== -1 ? raw.slice(headerEnd + 4) : '';
      let parsed: unknown;
      try { parsed = JSON.parse(bodyStr); } catch { parsed = bodyStr; }
      resolve({ status: statusCode, body: parsed });
    });

    socket.setTimeout(5000, () => { socket.destroy(); reject(new Error('WTF request timeout')); });
    socket.on('error', reject);
  });
}

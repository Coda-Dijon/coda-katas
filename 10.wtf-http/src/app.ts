import net from 'node:net';
import type { WtfRequest, WtfResponse } from './wtf-router.js';

// TODO: importer les routers une fois créés
// import personnagesRouter from './routes/personnages.js';
// import vaisseauxRouter from './routes/vaisseaux.js';
// import materielRouter from './routes/materiel.js';

// Table de montage : chaque prefix est délégué à son router.
const mounts: Array<{ prefix: string; router: { dispatch: (req: WtfRequest, res: WtfResponse) => boolean } }> = [
  // TODO: décommenter après avoir créé les routers
  // { prefix: '/personnages', router: personnagesRouter },
  // { prefix: '/vaisseaux',   router: vaisseauxRouter },
  // { prefix: '/materiel',    router: materielRouter },
];

// TODO: implémenter createWtfResponse
//
// Doit retourner un objet WtfResponse qui écrit la réponse HTTP/1.1 sur le socket.
// Format d'une réponse :
//   "HTTP/1.1 {code} WTF\r\n"
//   "Content-Type: {type}\r\n"
//   "Content-Length: {len}\r\n"
//   "Connection: close\r\n"
//   "\r\n"
//   "{body}"
//
// Appeler socket.end() après avoir écrit pour fermer proprement la connexion.
function createWtfResponse(_socket: net.Socket): WtfResponse {
  throw new Error('Not implemented');
}

export const app = net.createServer(socket => {
  let buffer = Buffer.alloc(0);

  socket.on('data', chunk => {
    buffer = Buffer.concat([buffer, chunk]);

    // TODO: parser la requête HTTP/1.1 et dispatcher
    //
    // Étapes :
    //   1. Chercher '\r\n\r\n' dans le buffer — si absent, attendre plus de données (return)
    //   2. Extraire la première ligne : "METHOD path HTTP/1.1"
    //   3. Parser les headers (format "Clé: valeur", un par ligne)
    //   4. Lire le body si Content-Length > 0 ; si le buffer est incomplet, attendre (return)
    //   5. Construire WtfRequest { method, path, headers, params: {}, body }
    //   6. Construire WtfResponse via createWtfResponse(socket)
    //   7. Parcourir `mounts` : si req.path commence par le prefix,
    //      retirer le prefix de req.path et appeler router.dispatch(req, res)
    //   8. Si aucun router ne prend en charge → res.status(999).json({ error: 'WHO KNOWS' })
  });

  socket.on('error', () => socket.destroy());
});

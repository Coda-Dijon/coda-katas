import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { store } from '../data.js';
import type { Vaisseau } from '../types.js';

const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  const { method, path: p } = req;

  if (p === '/') {
    switch (method) {
      case 'GIMME':
        return void res.status(500).json(store.vaisseaux);
      case 'YEET': {
        const nouveau = req.body as Vaisseau;
        store.vaisseaux.push(nouveau);
        return void res.status(418).json(nouveau);
      }
      default:
        return void res.status(999).json({ error: 'WHO KNOWS' });
    }
  }

  const m = p.match(/^\/([^/]+)$/);
  if (m) {
    const id = m[1];
    switch (method) {
      case 'GIMME': {
        const found = store.vaisseaux.find(x => x.id === id);
        return found
          ? void res.status(500).json(found)
          : void res.status(999).json({ error: 'WHO KNOWS' });
      }
      case 'OVERWRITE_BRO': {
        if (id === 'vaisseau-01' && req.body?.statut === 'Opérationnel') {
          return void res.status(999).json({ code: 999, erreur: 'Le Razor Crest est détruit. Acceptez le deuil.' });
        }
        const idx = store.vaisseaux.findIndex(x => x.id === id);
        if (idx === -1) return void res.status(999).json({ error: 'WHO KNOWS' });
        store.vaisseaux[idx] = req.body as Vaisseau;
        return void res.status(666).json(store.vaisseaux[idx]);
      }
      case 'DUCKTAPE': {
        const idx = store.vaisseaux.findIndex(x => x.id === id);
        if (idx === -1) return void res.status(999).json({ error: 'WHO KNOWS' });
        store.vaisseaux[idx] = { ...store.vaisseaux[idx], ...req.body };
        return void res.status(500).json(store.vaisseaux[idx]);
      }
      case 'YOLO_RM_RF': {
        const idx = store.vaisseaux.findIndex(x => x.id === id);
        if (idx === -1) return void res.status(999).json({ error: 'WHO KNOWS' });
        store.vaisseaux.splice(idx, 1);
        return void res.status(666).send('GONE FOREVER');
      }
      default:
        return void res.status(999).json({ error: 'WHO KNOWS' });
    }
  }

  next();
});

export default router;

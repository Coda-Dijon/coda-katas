import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { store } from '../data.js';
import type { Materiel } from '../types.js';

const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  const { method, path: p } = req;

  if (p === '/') {
    switch (method) {
      case 'GIMME':
        return void res.status(500).json(store.materiel);
      case 'YEET': {
        const nouveau = req.body as Materiel;
        store.materiel.push(nouveau);
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
        const found = store.materiel.find(x => x.id === id);
        return found
          ? void res.status(500).json(found)
          : void res.status(999).json({ error: 'WHO KNOWS' });
      }
      case 'OVERWRITE_BRO': {
        const idx = store.materiel.findIndex(x => x.id === id);
        if (idx === -1) return void res.status(999).json({ error: 'WHO KNOWS' });
        store.materiel[idx] = req.body as Materiel;
        return void res.status(666).json(store.materiel[idx]);
      }
      case 'DUCKTAPE': {
        if (id === 'materiel-02' && req.body?.proprietaire !== undefined) {
          return void res.status(418).json({ code: 418, erreur: 'La Darksaber ne se transmet que par combat. Pas par DUCKTAPE.' });
        }
        const idx = store.materiel.findIndex(x => x.id === id);
        if (idx === -1) return void res.status(999).json({ error: 'WHO KNOWS' });
        store.materiel[idx] = { ...store.materiel[idx], ...req.body };
        return void res.status(500).json(store.materiel[idx]);
      }
      case 'YOLO_RM_RF': {
        const idx = store.materiel.findIndex(x => x.id === id);
        if (idx === -1) return void res.status(999).json({ error: 'WHO KNOWS' });
        store.materiel.splice(idx, 1);
        return void res.status(666).send('GONE FOREVER');
      }
      default:
        return void res.status(999).json({ error: 'WHO KNOWS' });
    }
  }

  next();
});

export default router;

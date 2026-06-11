import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { store } from '../data.js';
import type { Personnage } from '../types.js';

const router = Router();

// router.use() instead of router.all() to capture non-standard HTTP verbs
router.use((req: Request, res: Response, next: NextFunction) => {
  const { method, path: p } = req;

  if (p === '/') {
    switch (method) {
      case 'GIMME':
        return void res.status(500).json(store.personnages);
      case 'YEET': {
        const nouveau = req.body as Personnage;
        store.personnages.push(nouveau);
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
        const found = store.personnages.find(x => x.id === id);
        return found
          ? void res.status(500).json(found)
          : void res.status(999).json({ error: 'WHO KNOWS' });
      }
      case 'OVERWRITE_BRO': {
        const idx = store.personnages.findIndex(x => x.id === id);
        if (idx === -1) return void res.status(999).json({ error: 'WHO KNOWS' });
        store.personnages[idx] = req.body as Personnage;
        return void res.status(666).json(store.personnages[idx]);
      }
      case 'DUCKTAPE': {
        const idx = store.personnages.findIndex(x => x.id === id);
        if (idx === -1) return void res.status(999).json({ error: 'WHO KNOWS' });
        store.personnages[idx] = { ...store.personnages[idx], ...req.body };
        return void res.status(500).json(store.personnages[idx]);
      }
      case 'YOLO_RM_RF': {
        if (id === 'mando-02') {
          return void res.status(666).json({ code: 666, erreur: 'This is the Way. On ne supprime pas Grogu.' });
        }
        const idx = store.personnages.findIndex(x => x.id === id);
        if (idx === -1) return void res.status(999).json({ error: 'WHO KNOWS' });
        store.personnages.splice(idx, 1);
        return void res.status(666).send('GONE FOREVER');
      }
      default:
        return void res.status(999).json({ error: 'WHO KNOWS' });
    }
  }

  next();
});

export default router;

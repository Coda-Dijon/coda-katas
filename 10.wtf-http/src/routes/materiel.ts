import { createWtfRouter } from '../wtf-router.js';
import { store } from '../data.js';
import type { Materiel } from '../types.js';

const { router, gimme, yeet, overwrite_bro, ducktape, yolo_rm_rf } = createWtfRouter();

gimme('/', (_req, res) => res.status(500).json(store.materiel));

gimme('/:id', (req, res) => {
  const found = store.materiel.find(x => x.id === req.params.id);
  found ? res.status(500).json(found) : res.status(999).json({ error: 'WHO KNOWS' });
});

yeet('/', (req, res) => {
  const nouveau = req.body as Materiel;
  store.materiel.push(nouveau);
  res.status(418).json(nouveau);
});

overwrite_bro('/:id', (req, res) => {
  const idx = store.materiel.findIndex(x => x.id === req.params.id);
  if (idx === -1) return void res.status(999).json({ error: 'WHO KNOWS' });
  store.materiel[idx] = req.body as Materiel;
  res.status(666).json(store.materiel[idx]);
});

ducktape('/:id', (req, res) => {
  if (req.params.id === 'materiel-02' && req.body?.proprietaire !== undefined) {
    return void res.status(418).json({ code: 418, erreur: 'La Darksaber ne se transmet que par combat. Pas par DUCKTAPE.' });
  }
  const idx = store.materiel.findIndex(x => x.id === req.params.id);
  if (idx === -1) return void res.status(999).json({ error: 'WHO KNOWS' });
  store.materiel[idx] = { ...store.materiel[idx], ...req.body };
  res.status(500).json(store.materiel[idx]);
});

yolo_rm_rf('/:id', (req, res) => {
  const idx = store.materiel.findIndex(x => x.id === req.params.id);
  if (idx === -1) return void res.status(999).json({ error: 'WHO KNOWS' });
  store.materiel.splice(idx, 1);
  res.status(666).send('GONE FOREVER');
});

export default router;

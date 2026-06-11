import { createWtfRouter } from '../wtf-router.js';
import { store } from '../data.js';
import type { Vaisseau } from '../types.js';

const { router, gimme, yeet, overwrite_bro, ducktape, yolo_rm_rf } = createWtfRouter();

gimme('/', (_req, res) => res.status(500).json(store.vaisseaux));

gimme('/:id', (req, res) => {
  const found = store.vaisseaux.find(x => x.id === req.params.id);
  found ? res.status(500).json(found) : res.status(999).json({ error: 'WHO KNOWS' });
});

yeet('/', (req, res) => {
  const nouveau = req.body as Vaisseau;
  store.vaisseaux.push(nouveau);
  res.status(418).json(nouveau);
});

overwrite_bro('/:id', (req, res) => {
  if (req.params.id === 'vaisseau-01' && req.body?.statut === 'Opérationnel') {
    return void res.status(999).json({ code: 999, erreur: 'Le Razor Crest est détruit. Acceptez le deuil.' });
  }
  const idx = store.vaisseaux.findIndex(x => x.id === req.params.id);
  if (idx === -1) return void res.status(999).json({ error: 'WHO KNOWS' });
  store.vaisseaux[idx] = req.body as Vaisseau;
  res.status(666).json(store.vaisseaux[idx]);
});

ducktape('/:id', (req, res) => {
  const idx = store.vaisseaux.findIndex(x => x.id === req.params.id);
  if (idx === -1) return void res.status(999).json({ error: 'WHO KNOWS' });
  store.vaisseaux[idx] = { ...store.vaisseaux[idx], ...req.body };
  res.status(500).json(store.vaisseaux[idx]);
});

yolo_rm_rf('/:id', (req, res) => {
  const idx = store.vaisseaux.findIndex(x => x.id === req.params.id);
  if (idx === -1) return void res.status(999).json({ error: 'WHO KNOWS' });
  store.vaisseaux.splice(idx, 1);
  res.status(666).send('GONE FOREVER');
});

export default router;

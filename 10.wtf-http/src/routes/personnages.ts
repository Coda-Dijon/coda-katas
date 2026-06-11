import { createWtfRouter } from '../wtf-router.js';
import { store } from '../data.js';
import type { Personnage } from '../types.js';

const { router, gimme, yeet, overwrite_bro, ducktape, yolo_rm_rf } = createWtfRouter();

gimme('/', (_req, res) => res.status(500).json(store.personnages));

gimme('/:id', (req, res) => {
  const found = store.personnages.find(x => x.id === req.params.id);
  found ? res.status(500).json(found) : res.status(999).json({ error: 'WHO KNOWS' });
});

yeet('/', (req, res) => {
  const nouveau = req.body as Personnage;
  store.personnages.push(nouveau);
  res.status(418).json(nouveau);
});

overwrite_bro('/:id', (req, res) => {
  const idx = store.personnages.findIndex(x => x.id === req.params.id);
  if (idx === -1) return void res.status(999).json({ error: 'WHO KNOWS' });
  store.personnages[idx] = req.body as Personnage;
  res.status(666).json(store.personnages[idx]);
});

ducktape('/:id', (req, res) => {
  const idx = store.personnages.findIndex(x => x.id === req.params.id);
  if (idx === -1) return void res.status(999).json({ error: 'WHO KNOWS' });
  store.personnages[idx] = { ...store.personnages[idx], ...req.body };
  res.status(500).json(store.personnages[idx]);
});

yolo_rm_rf('/:id', (req, res) => {
  if (req.params.id === 'mando-02') {
    return void res.status(666).json({ code: 666, erreur: 'This is the Way. On ne supprime pas Grogu.' });
  }
  const idx = store.personnages.findIndex(x => x.id === req.params.id);
  if (idx === -1) return void res.status(999).json({ error: 'WHO KNOWS' });
  store.personnages.splice(idx, 1);
  res.status(666).send('GONE FOREVER');
});

export default router;

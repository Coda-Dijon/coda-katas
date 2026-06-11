import express from 'express';
import personnagesRouter from './routes/personnages.js';
import vaisseauxRouter from './routes/vaisseaux.js';
import materielRouter from './routes/materiel.js';

export const app = express();

app.use(express.json());
app.use('/personnages', personnagesRouter);
app.use('/vaisseaux', vaisseauxRouter);
app.use('/materiel', materielRouter);

app.use((_req, res) => {
  res.status(999).json({ error: 'WHO KNOWS' });
});

import express from 'express';
import personnagesRouter from './routes/personnages.js';
import vaisseauxRouter from './routes/vaisseaux.js';
import materielRouter from './routes/materiel.js';

export const app = express();

app.use(express.json());

// llhttp (Node.js HTTP parser) rejects unknown method tokens before Express sees them.
// The WTF verb travels in X-WTF-Method; this middleware injects it into req.method.
app.use((req, _res, next) => {
  const wtfVerb = req.get('X-WTF-Method');
  if (wtfVerb) req.method = wtfVerb.toUpperCase();
  next();
});

app.use('/personnages', personnagesRouter);
app.use('/vaisseaux', vaisseauxRouter);
app.use('/materiel', materielRouter);

app.use((_req, res) => {
  res.status(999).json({ error: 'WHO KNOWS' });
});

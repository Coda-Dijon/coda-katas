import { app } from './app.js';

const PORT = 1138;

app.listen(PORT, () => {
  console.log(`ONLINE AND SUFFERING → http://localhost:${PORT}`);
});

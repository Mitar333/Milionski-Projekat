// backend/server.js

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Primer ruta
app.get('/', (req, res) => {
  res.send('Backend radi!');
});
app.get('/api', (req, res) => {
  res.send('Backend radi1!');
});
// Ovde možeš dodavati rute za zakazivanje termina itd.

app.listen(PORT, () => {
  console.log(`Server radi na http://localhost:${PORT}`);
});

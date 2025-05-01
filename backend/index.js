const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'youtube_indexer'
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connecté à la base de données MySQL ✅');
});

app.get('/videos', (req, res) => {
  db.query('SELECT * FROM videos', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des vidéos:', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Serveur backend démarré sur le port ${port}`);
});

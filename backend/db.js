const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // mets le mot de passe si tu en as mis un dans phpMyAdmin
  database: 'youtube_indexer'
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connecté à MySQL ✅');
});

module.exports = connection;

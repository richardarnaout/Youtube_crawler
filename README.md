# React + Vite

YouTube Indexer
Ce projet permet d'indexer des vidéos YouTube via une API YouTube, avec un backend en Node.js, un frontend en React, et une base de données MySQL pour stocker les informations.



Prérequis
Avant de commencer, il faut avoir installé les outils suivants :

Node.js : Télécharger et installer Node.js

XAMPP : Télécharger et installer XAMPP (pour MySQL et Apache)

MySQL Workbench (optionnel) : Télécharger et installer MySQL Workbench


1. Backend (Node.js)
1.1 Créer le Répertoire du Projet
Dans le terminal, créez un dossier pour le backend :

```
mkdir backend
cd backend
```

1.2 Initialiser le Projet Node.js
Initialisez un projet Node.js :

```
npm init -y
```


1.3 Installer les Dépendances Backend
Installez les dépendances nécessaires pour le backend :


```
npm install express mysql dotenv
```


1.4 Créer le Fichier index.js
Créez un fichier index.js et ajoutez le code suivant pour configurer le serveur backend :


```
const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();  // Charger les variables d'environnement depuis .env

const app = express();
app.use(express.json());  // Permet l'envoi de données JSON

// Configuration de la base de données MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  // Mot de passe par défaut dans XAMPP
  database: 'youtube_db',  // Nom de la base de données
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
  } else {
    console.log('Connexion à la base de données réussie !');
  }
});

// Test de la base de données
app.get('/test-db', (req, res) => {
  db.query('SELECT * FROM videos', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erreur de la base de données' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Démarrer le serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
````


1.4 Créer le Fichier index.js
Créez un fichier index.js et ajoutez le code suivant pour configurer le serveur backend :



```
const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();  // Charger les variables d'environnement depuis .env

const app = express();
app.use(express.json());  // Permet l'envoi de données JSON

// Configuration de la base de données MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  // Mot de passe par défaut dans XAMPP
  database: 'youtube_db',  // Nom de la base de données
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
  } else {
    console.log('Connexion à la base de données réussie !');
  }
});

// Test de la base de données
app.get('/test-db', (req, res) => {
  db.query('SELECT * FROM videos', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erreur de la base de données' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Démarrer le serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
```

1.5 Créer le Fichier .env
Dans le dossier backend, créez un fichier .env et ajoutez votre clé API YouTube 

```
YOUTUBE_API_KEY=ta_cle_api_youtube
```

1.6 Démarrer le Serveur Backend
Lancez le serveur backend avec la commande :

```
node index.js
```

2. Frontend (React avec Vite)
2.1 Créer le Répertoire du Projet Frontend
Retournez à la racine du projet, puis créez un répertoire pour le frontend :

```
cd ..
mkdir frontend
cd frontend
```

2.2 Initialiser le Projet React avec Vite
Initialisez un projet React avec Vite :

```
npm create vite@latest
```

Choisissez React comme template.

2.3 Installer les Dépendances Frontend
Installez les dépendances nécessaires pour le frontend :

```
npm install
```

2.4 Créer le Fichier App.jsx
Remplacez le contenu de src/App.jsx par le code suivant pour la recherche de vidéos YouTube et l'affichage des résultats :

```

app.jsx

```

2.5 Créer le Fichier .env pour le Frontend
Dans le dossier frontend, créez un fichier .env et ajoutez la clé API YouTube :


```
VITE_YOUTUBE_API_KEY=cle_api_youtube
```

2.6 Démarrer le Serveur Frontend

```
npm run dev
```

Accédez à l'application via http://localhost:5173.


3. Configuration de la Base de Données MySQL
3.1 Créer la Base de Données et la Table
Lancez phpMyAdmin via XAMPP, créez une base de données youtube_db, puis créez la table videos :

```
CREATE TABLE videos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  video_id VARCHAR(255)
);
```

3.2 Insérer des Données dans la Base

Les dépendances nécessaires sont installées avec npm install axios sqlite3. Il crée ensuite un fichier pour sa base de données SQLite avec touch database.db, ouvre SQLite en exécutant sqlite3 database.db et crée les tables nécessaires (comme videos et channels) avec les commandes SQL. Un fichier statements.sql est créé pour stocker les requêtes SQL, telles que l'insertion de vidéos et de canaux. Pour interagir avec la base de données et l'API YouTube, il crée un fichier index.js où il utilise la bibliothèque axios pour appeler l'API YouTube et sqlite3 pour gérer la base de données. Lorsqu'il appelle l'API YouTube, il récupère les vidéos d'une chaîne et les insère dans la base de données SQLite. Enfin, il crée un fichier .gitignore pour exclure des fichiers comme database.db et le dossier node_modules/ du versionnage Git.



Conclusion
Ce guide couvre l'installation et la configuration du backend avec Node.js, du frontend avec React, ainsi que la configuration de MySQL pour l'indexation des vidéos YouTube. Utilisez ce projet pour récupérer et afficher des vidéos de YouTube tout en les stockant dans une base de données pour une utilisation ultérieure.



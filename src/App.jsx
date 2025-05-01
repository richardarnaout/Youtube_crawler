import React, { useState } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchVideos = async (query) => {
    const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${API_KEY}`
      );
      const data = await response.json();
      setVideos(data.items);

      const newHistoryItem = { query, date: new Date().toLocaleString() };
      setHistory((prevHistory) => [newHistoryItem, ...prevHistory]);
    } catch (error) {
      console.error('Erreur lors de la récupération des vidéos:', error);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetchVideos(searchTerm);
      setShowHistory(false);
    }
  };

  const handleShowHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">VI</h1>

        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            className="search-bar"
            placeholder="Rechercher des vidéos..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="submit" className="search-button">Rechercher</button>
        </form>

        <button onClick={handleShowHistory} className="history-button">
          {showHistory ? "Retour" : "Voir l'historique"}
        </button>

        {showHistory ? (
          <div className="history-list">
            <h2>Historique des recherches</h2>
            {history.length > 0 ? (
              history.map((item, index) => (
                <div key={index} className="history-item">
                  🔎 {item.query} - {item.date}
                </div>
              ))
            ) : (
              <p>Aucune recherche enregistrée.</p>
            )}
          </div>
        ) : (
          <div className="video-list">
            {videos.length > 0 ? (
              videos.map((video) => (
                <div key={video.id.videoId} className="video-item">
                  {/* On remplace le <a> par un iframe */}
                  <iframe
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${video.id.videoId}`}
                    title={video.snippet.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="video-iframe"
                  ></iframe>
                  <div className="video-details">
                    <h2>{video.snippet.title}</h2>
                    <p>{video.snippet.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Aucune vidéo trouvée. Essayez un autre mot-clé.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

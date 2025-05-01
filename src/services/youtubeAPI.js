import axios from 'axios';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY; // Récupérer la clé API depuis .env
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Fonction pour récupérer les vidéos de la chaîne
export const fetchChannelVideos = async (channelId) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        channelId: channelId, // ID de la chaîne
        maxResults: 5, // Limiter le nombre de résultats
        order: 'date', // Trier les vidéos par date
        key: API_KEY, // Ajouter la clé API
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Erreur lors de la récupération des vidéos YouTube:', error);
    return [];
  }
};

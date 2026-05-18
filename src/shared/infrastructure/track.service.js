import { BASE_API_URL } from './base-endpoint.js';
import { getLocalDb } from './local-data.js';

const TRACKS_ENDPOINT = `${BASE_API_URL}/tracks`;

export const trackService = {
  /**
   * Obtiene todas las pistas.
   */
  getAllTracks: async () => {
    try {
      const response = await fetch(TRACKS_ENDPOINT);
      if (!response.ok) throw new Error('Failed to fetch tracks');
      return await response.json();
    } catch (error) {
      console.warn('Backend unavailable, using local tracks data.');
      return getLocalDb().tracks;
    }
  },

  /**
   * Obtiene una pista por ID.
   */
  getTrackById: async (trackId) => {
    try {
      const response = await fetch(`${TRACKS_ENDPOINT}/${trackId}`);
      if (!response.ok) throw new Error('Failed to fetch track');
      return await response.json();
    } catch (error) {
      const localTrack = getLocalDb().tracks.find((track) => track.id === Number(trackId));
      if (!localTrack) throw error;
      return localTrack;
    }
  }
};

export default trackService;


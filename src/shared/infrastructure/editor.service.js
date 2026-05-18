import { BASE_API_URL } from './base-endpoint.js';
import { getLocalDb, nextId, setLocalDb } from './local-data.js';

const EDITORS_ENDPOINT = `${BASE_API_URL}/editors`;

export const editorService = {
  /**
   * Obtiene todos los editores.
   */
  getAllEditors: async () => {
    try {
      const response = await fetch(EDITORS_ENDPOINT);
      if (!response.ok) throw new Error('Failed to fetch editors');
      return await response.json();
    } catch (error) {
      console.warn('Backend unavailable, using local editors data.');
      return getLocalDb().editors;
    }
  },

  /**
   * Obtiene editores por rol.
   */
  getEditorsByRole: async (editorRole) => {
    try {
      const response = await fetch(`${EDITORS_ENDPOINT}?editorRole=${editorRole}`);
      if (!response.ok) throw new Error('Failed to fetch editors');
      return await response.json();
    } catch (error) {
      return getLocalDb().editors.filter((editor) => editor.editorRole === editorRole);
    }
  },

  /**
   * Crea un nuevo editor.
   */
  createEditor: async (editorData) => {
    try {
      const response = await fetch(EDITORS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editorData)
      });
      if (!response.ok) throw new Error('Failed to create editor');
      return await response.json();
    } catch (error) {
      const db = getLocalDb();
      const created = { ...editorData, id: nextId(db.editors) };
      db.editors.push(created);
      setLocalDb(db);
      return created;
    }
  },

  /**
   * Obtiene editores registrados hoy para una pista específica.
   */
  getEditorsRegisteredTodayForTrack: async (trackId) => {
    try {
      const editors = await editorService.getAllEditors();
      const today = new Date().toISOString().split('T')[0];
      return editors.filter(editor => 
        editor.trackId === trackId && 
        editor.registeredAt.startsWith(today)
      );
    } catch (error) {
      console.error('Error fetching editors registered today:', error);
      throw error;
    }
  }
};

export default editorService;


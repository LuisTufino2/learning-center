/**
 * Editorial Infrastructure Layer
 * HTTP Client Repository Implementation
 */

import { BASE_API_URL } from '../../../shared/infrastructure/base-endpoint.js';
import { getLocalDb, nextId, setLocalDb } from '../../../shared/infrastructure/local-data.js';

const EDITORS_ENDPOINT = `${BASE_API_URL}/editors`;

/**
 * Editor HTTP Repository
 * Implements IEditorRepository using HTTP requests (json-server)
 */
export class EditorHttpRepository {
  /**
   * Get all editors
   */
  async getAll() {
    try {
      const response = await fetch(EDITORS_ENDPOINT);
      if (!response.ok) throw new Error('Failed to fetch editors');
      return await response.json();
    } catch (error) {
      console.warn('Backend unavailable, using local editors data.');
      return getLocalDb().editors;
    }
  }

  /**
   * Get editor by ID
   */
  async getById(id) {
    try {
      const response = await fetch(`${EDITORS_ENDPOINT}/${id}`);
      if (!response.ok) throw new Error('Editor not found');
      return await response.json();
    } catch (error) {
      const localEditor = getLocalDb().editors.find((editor) => editor.id === Number(id));
      if (!localEditor) throw error;
      return localEditor;
    }
  }

  /**
   * Get editors by role
   */
  async getByRole(role) {
    try {
      const response = await fetch(`${EDITORS_ENDPOINT}?editorRole=${role}`);
      if (!response.ok) throw new Error('Failed to fetch editors');
      return await response.json();
    } catch (error) {
      return getLocalDb().editors.filter((editor) => editor.editorRole === role);
    }
  }

  /**
   * Get editors registered today for a track
   */
  async getRegisteredTodayForTrack(trackId) {
    try {
      const editors = await this.getAll();
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

  /**
   * Create a new editor
   */
  async create(editorData) {
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
  }

  /**
   * Update an editor
   */
  async update(id, editorData) {
    try {
      const response = await fetch(`${EDITORS_ENDPOINT}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editorData)
      });
      if (!response.ok) throw new Error('Failed to update editor');
      return await response.json();
    } catch (error) {
      console.error('Error updating editor:', error);
      throw error;
    }
  }

  /**
   * Delete an editor
   */
  async delete(id) {
    try {
      const response = await fetch(`${EDITORS_ENDPOINT}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete editor');
      return await response.json();
    } catch (error) {
      console.error('Error deleting editor:', error);
      throw error;
    }
  }
}

export default EditorHttpRepository;


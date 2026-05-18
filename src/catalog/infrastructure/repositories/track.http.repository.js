/**
 * Catalog Infrastructure Layer
 * HTTP Repository Implementation
 */

import { BASE_API_URL } from '../../../shared/infrastructure/base-endpoint.js';

const TRACKS_ENDPOINT = `${BASE_API_URL}/tracks`;

/**
 * Track HTTP Repository
 * Implements ITrackRepository using HTTP requests (json-server)
 */
export class TrackHttpRepository {
  /**
   * Get all tracks
   */
  async getAll() {
    try {
      const response = await fetch(TRACKS_ENDPOINT);
      if (!response.ok) throw new Error('Failed to fetch tracks');
      return await response.json();
    } catch (error) {
      console.error('Error fetching tracks:', error);
      throw error;
    }
  }

  /**
   * Get track by ID
   */
  async getById(id) {
    try {
      const response = await fetch(`${TRACKS_ENDPOINT}/${id}`);
      if (!response.ok) throw new Error('Track not found');
      return await response.json();
    } catch (error) {
      console.error('Error fetching track:', error);
      throw error;
    }
  }

  /**
   * Get tracks with cost higher than threshold
   */
  async getHighCostTracks(threshold) {
    try {
      const tracks = await this.getAll();
      return tracks.filter(track => track.costPerHour >= threshold);
    } catch (error) {
      console.error('Error fetching high cost tracks:', error);
      throw error;
    }
  }

  /**
   * Create a new track
   */
  async create(trackData) {
    try {
      const response = await fetch(TRACKS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(trackData)
      });
      if (!response.ok) throw new Error('Failed to create track');
      return await response.json();
    } catch (error) {
      console.error('Error creating track:', error);
      throw error;
    }
  }

  /**
   * Update a track
   */
  async update(id, trackData) {
    try {
      const response = await fetch(`${TRACKS_ENDPOINT}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(trackData)
      });
      if (!response.ok) throw new Error('Failed to update track');
      return await response.json();
    } catch (error) {
      console.error('Error updating track:', error);
      throw error;
    }
  }

  /**
   * Delete a track
   */
  async delete(id) {
    try {
      const response = await fetch(`${TRACKS_ENDPOINT}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete track');
      return await response.json();
    } catch (error) {
      console.error('Error deleting track:', error);
      throw error;
    }
  }
}

export default TrackHttpRepository;


/**
 * Catalog Domain Repository Interface
 */

/**
 * @interface ITrackRepository
 */
export class ITrackRepository {
  /**
   * Get all tracks
   * @returns {Promise<Track[]>}
   */
  async getAll() {
    throw new Error('Not implemented');
  }

  /**
   * Get track by ID
   * @param {number} id
   * @returns {Promise<Track|null>}
   */
  async getById(id) {
    throw new Error('Not implemented');
  }

  /**
   * Get tracks with high cost
   * @param {number} threshold
   * @returns {Promise<Track[]>}
   */
  async getHighCostTracks(threshold) {
    throw new Error('Not implemented');
  }

  /**
   * Create a new track
   * @param {Track} track
   * @returns {Promise<Track>}
   */
  async create(track) {
    throw new Error('Not implemented');
  }

  /**
   * Update a track
   * @param {Track} track
   * @returns {Promise<Track>}
   */
  async update(track) {
    throw new Error('Not implemented');
  }

  /**
   * Delete a track
   * @param {number} id
   * @returns {Promise<void>}
   */
  async delete(id) {
    throw new Error('Not implemented');
  }
}

export default ITrackRepository;


/**
 * Editor Repository Interface
 * Defines the contract for editor data access operations
 */

/**
 * @interface IEditorRepository
 */
export class IEditorRepository {
  /**
   * Get all editors
   * @returns {Promise<Editor[]>}
   */
  async getAll() {
    throw new Error('Not implemented');
  }

  /**
   * Get editor by ID
   * @param {number} id
   * @returns {Promise<Editor|null>}
   */
  async getById(id) {
    throw new Error('Not implemented');
  }

  /**
   * Get editors by role
   * @param {string} role
   * @returns {Promise<Editor[]>}
   */
  async getByRole(role) {
    throw new Error('Not implemented');
  }

  /**
   * Get editors registered today for a track
   * @param {number} trackId
   * @returns {Promise<Editor[]>}
   */
  async getRegisteredTodayForTrack(trackId) {
    throw new Error('Not implemented');
  }

  /**
   * Create a new editor
   * @param {Editor} editor
   * @returns {Promise<Editor>}
   */
  async create(editor) {
    throw new Error('Not implemented');
  }

  /**
   * Update an editor
   * @param {Editor} editor
   * @returns {Promise<Editor>}
   */
  async update(editor) {
    throw new Error('Not implemented');
  }

  /**
   * Delete an editor
   * @param {number} id
   * @returns {Promise<void>}
   */
  async delete(id) {
    throw new Error('Not implemented');
  }
}

export default IEditorRepository;


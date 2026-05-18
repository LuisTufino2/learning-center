/**
 * Editorial Bounded Context Domain Model
 * Defines the core entities and value objects for the editorial domain.
 */

/**
 * Editor Entity - Represents an editor in the system
 */
export class Editor {
  constructor(id, trackId, editorRole, status, registeredAt) {
    this.id = id;
    this.trackId = trackId;
    this.editorRole = editorRole;
    this.status = status;
    this.registeredAt = registeredAt;
  }

  /**
   * Check if editor is available
   */
  isAvailable() {
    return this.status === 'AVAILABLE';
  }

  /**
   * Get hours elapsed since registration
   */
  getHoursElapsed() {
    const now = new Date();
    const registered = new Date(this.registeredAt);
    return Math.round((now - registered) / (1000 * 60 * 60));
  }
}

/**
 * Editor Role Value Object
 */
export class EditorRole {
  static METADATA_REVIEWER = 'METADATA_REVIEWER';
  static SYNC_SPECIALIST = 'SYNC_SPECIALIST';
  static AUDIO_QUALITY_ANALYST = 'AUDIO_QUALITY_ANALYST';

  static isValid(role) {
    return [
      this.METADATA_REVIEWER,
      this.SYNC_SPECIALIST,
      this.AUDIO_QUALITY_ANALYST
    ].includes(role);
  }

  static getAll() {
    return [
      this.METADATA_REVIEWER,
      this.SYNC_SPECIALIST,
      this.AUDIO_QUALITY_ANALYST
    ];
  }
}

/**
 * Editor Status Value Object
 */
export class EditorStatus {
  static AVAILABLE = 'AVAILABLE';
  static BUSY = 'BUSY';

  static isValid(status) {
    return [this.AVAILABLE, this.BUSY].includes(status);
  }

  static getAll() {
    return [this.AVAILABLE, this.BUSY];
  }
}


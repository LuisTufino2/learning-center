/**
 * Catalog Bounded Context Domain Model
 * Defines the core entities for the catalog domain
 */

/**
 * Track Entity - Represents a music track
 */
export class Track {
  constructor(id, name, costPerHour, impactInPlayback, defaultAction) {
    this.id = id;
    this.name = name;
    this.costPerHour = costPerHour;
    this.impactInPlayback = impactInPlayback;
    this.defaultAction = defaultAction;
  }

  /**
   * Check if track has playback impact
   */
  hasPlaybackImpact() {
    return this.impactInPlayback !== 'NONE';
  }

  /**
   * Get impact level
   */
  getImpactLevel() {
    return this.impactInPlayback;
  }

  /**
   * Get required action
   */
  getRequiredAction() {
    return this.defaultAction;
  }
}

/**
 * Impact Level Value Object
 */
export class ImpactLevel {
  static NONE = 'NONE';
  static PARTIAL = 'PARTIAL';
  static TOTAL = 'TOTAL';

  static isValid(level) {
    return [this.NONE, this.PARTIAL, this.TOTAL].includes(level);
  }

  static getAll() {
    return [this.NONE, this.PARTIAL, this.TOTAL];
  }
}

/**
 * Default Action Value Object
 */
export class DefaultAction {
  static REPROCESS = 'REPROCESS';
  static REPLACE = 'REPLACE';

  static isValid(action) {
    return [this.REPROCESS, this.REPLACE].includes(action);
  }

  static getAll() {
    return [this.REPROCESS, this.REPLACE];
  }
}


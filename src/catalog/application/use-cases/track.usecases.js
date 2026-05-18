/**
 * Catalog Application Layer - Use Cases and DTOs
 */

/**
 * Track Response DTO
 */
export class TrackResponseDTO {
  constructor(track) {
    this.id = track.id;
    this.name = track.name;
    this.costPerHour = track.costPerHour;
    this.impactInPlayback = track.impactInPlayback;
    this.defaultAction = track.defaultAction;
  }
}

/**
 * Get All Tracks Use Case
 */
export class GetAllTracksUseCase {
  constructor(trackRepository) {
    this.trackRepository = trackRepository;
  }

  async execute() {
    const tracks = await this.trackRepository.getAll();
    return tracks.map(track => new TrackResponseDTO(track));
  }
}

/**
 * Get Track by ID Use Case
 */
export class GetTrackByIdUseCase {
  constructor(trackRepository) {
    this.trackRepository = trackRepository;
  }

  async execute(trackId) {
    const track = await this.trackRepository.getById(trackId);
    return new TrackResponseDTO(track);
  }
}

/**
 * Get High Cost Tracks Use Case
 */
export class GetHighCostTracksUseCase {
  constructor(trackRepository) {
    this.trackRepository = trackRepository;
  }

  async execute(threshold = 50) {
    const tracks = await this.trackRepository.getHighCostTracks(threshold);
    return tracks.map(track => new TrackResponseDTO(track));
  }
}


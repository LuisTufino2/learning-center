/**
 * Catalog Bounded Context - Index
 */

// Domain Layer
export { Wine } from './domain/models/track.model.js';
export { IWineRepository } from './domain/repositories/track.repository.interface.js';

// Application Layer
export {
  WineResponseDTO,
  GetWinesByTypeUseCase,
  GetWineByIdUseCase
} from './application/use-cases/track.usecases.js';

// Infrastructure Layer
export { WineHttpRepository } from './infrastructure/repositories/track.http.repository.js';


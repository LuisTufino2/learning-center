/**
 * Cellars Bounded Context - Index
 * Central export point for the cellars domain entities, use cases, and repositories
 */

// Domain Layer
export { Cellar, PreservationItem } from './domain/models/editor.model.js';

// Application Layer
export {
  CreatePreservationItemDTO,
  PreservationItemResponseDTO,
  CreatePreservationItemUseCase
} from './application/use-cases/editor.usecases.js';

// Infrastructure Layer
export { PreservationItemHttpRepository } from './infrastructure/repositories/editor.http.repository.js';

// Presentation Layer
export { default as cellarsRoutes } from './presentation/cellars-routes.js';


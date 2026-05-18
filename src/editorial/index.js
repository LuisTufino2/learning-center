/**
 * Editorial Bounded Context - Index
 * Central export point for all editorial domain entities, use cases, and repositories
 */

// Domain Layer
export { Editor, EditorRole, EditorStatus } from './domain/models/editor.model.js';
export {
  EditorAlreadyRegisteredTodayException,
  InvalidEditorRoleException,
  InvalidEditorStatusException,
  EditorNotFoundException
} from './domain/exceptions/editor.exceptions.js';
export { IEditorRepository } from './domain/repositories/editor.repository.interface.js';

// Application Layer
export {
  CreateEditorDTO,
  EditorResponseDTO,
  CreateEditorUseCase,
  GetEditorsByRoleUseCase,
  GetAllEditorsUseCase
} from './application/use-cases/editor.usecases.js';

// Infrastructure Layer
export { EditorHttpRepository } from './infrastructure/repositories/editor.http.repository.js';

// Presentation Layer
export { default as editorialRoutes } from './presentation/editorial-routes.js';


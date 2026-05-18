/**
 * Editorial Application Layer
 * Use Cases and DTOs for the editorial domain
 */

import { EditorAlreadyRegisteredTodayException } from '../../domain/exceptions/editor.exceptions.js';

/**
 * Create Editor DTO
 */
export class CreateEditorDTO {
  constructor(trackId, editorRole) {
    this.trackId = trackId;
    this.editorRole = editorRole;
    this.status = 'AVAILABLE';
    this.registeredAt = new Date().toISOString();
  }
}

/**
 * Editor Response DTO
 */
export class EditorResponseDTO {
  constructor(editor) {
    this.id = editor.id;
    this.trackId = editor.trackId;
    this.editorRole = editor.editorRole;
    this.status = editor.status;
    this.registeredAt = editor.registeredAt;
  }
}

/**
 * Create Editor Use Case
 */
export class CreateEditorUseCase {
  constructor(editorRepository, serviceOrderService) {
    this.editorRepository = editorRepository;
    this.serviceOrderService = serviceOrderService;
  }

  async execute(createEditorDTO, track) {
    // Validate editor doesn't already exist for track today
    const editorsToday = await this.editorRepository.getRegisteredTodayForTrack(
      createEditorDTO.trackId
    );

    if (editorsToday.length > 0) {
      throw new EditorAlreadyRegisteredTodayException(createEditorDTO.trackId);
    }

    // Create editor
    const createdEditor = await this.editorRepository.create(createEditorDTO);

    // Auto-generate service order
    await this.serviceOrderService.createServiceOrder({
      trackId: createEditorDTO.trackId,
      issueId: `ISSUE_${Date.now()}`,
      neededAction: track.defaultAction,
      priority: 'NORMAL',
      registeredAt: new Date().toISOString()
    });

    return new EditorResponseDTO(createdEditor);
  }
}

/**
 * Get Editors By Role Use Case
 */
export class GetEditorsByRoleUseCase {
  constructor(editorRepository) {
    this.editorRepository = editorRepository;
  }

  async execute(role) {
    const editors = await this.editorRepository.getByRole(role);
    return editors.map(editor => new EditorResponseDTO(editor));
  }
}

/**
 * Get All Editors Use Case
 */
export class GetAllEditorsUseCase {
  constructor(editorRepository) {
    this.editorRepository = editorRepository;
  }

  async execute() {
    const editors = await this.editorRepository.getAll();
    return editors.map(editor => new EditorResponseDTO(editor));
  }
}


/**
 * Editorial Domain Exceptions
 */

export class EditorAlreadyRegisteredTodayException extends Error {
  constructor(trackId) {
    super(`An editor is already registered today for track ${trackId}`);
    this.name = 'EditorAlreadyRegisteredTodayException';
    this.trackId = trackId;
  }
}

export class InvalidEditorRoleException extends Error {
  constructor(role) {
    super(`Invalid editor role: ${role}`);
    this.name = 'InvalidEditorRoleException';
    this.role = role;
  }
}

export class InvalidEditorStatusException extends Error {
  constructor(status) {
    super(`Invalid editor status: ${status}`);
    this.name = 'InvalidEditorStatusException';
    this.status = status;
  }
}

export class EditorNotFoundException extends Error {
  constructor(editorId) {
    super(`Editor not found: ${editorId}`);
    this.name = 'EditorNotFoundException';
    this.editorId = editorId;
  }
}



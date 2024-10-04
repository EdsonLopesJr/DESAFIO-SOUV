export class MissingServiceError extends Error {
  constructor() {
    super('At least one service must be selected.');
    this.name = 'MissingServiceError';
  }
}

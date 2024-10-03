export class ServerError extends Error {
  constructor(message: string = 'Um erro interno do servidor ocorreu') {
    super(message);
    this.name = 'ServerError';
  }
}

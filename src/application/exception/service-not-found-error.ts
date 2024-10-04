export class ServiceNotFoundError extends Error {
  constructor(serviceId: string) {
    super(`Service with ID ${serviceId} does not exist.`);
    this.name = 'ServiceNotFoundError';
  }
}

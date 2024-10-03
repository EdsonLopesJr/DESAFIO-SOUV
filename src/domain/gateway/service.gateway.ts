import { Service } from '../entities/service.entity';

// Define a interface ServiceGateway para a persistência de dados
export interface ServiceGateway {
  // Método que deve ser implementado para salvar um serviço
  save(service: Service): Promise<void>;
}

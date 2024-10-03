import { Service } from '../../../domain/entities/service.entity';

export interface CreateServicePresenterOutput {
  id: string;
}

// Classe responsável por apresentar a saída do caso de uso de criação de serviço
export class CreateServicePresenter {
  // Método estático que transforma a entidade Service em um objeto de saída
  public static present(service: Service): CreateServicePresenterOutput {
    return {
      id: service.id
    };
  }
}

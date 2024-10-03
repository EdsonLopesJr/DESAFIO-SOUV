import { Service } from '../../../domain/entities/service.entity';

export interface ListServicePresenterOutput {
  id: string;
  name: string;
  description: string;
  icon: string;
}

// Classe responsável por apresentar a saída do caso de uso da listagem de serviço
export class ListServicePresenter {
  // Método estático que transforma a entidade Service em um objeto de saída
  public static present(services: Service[]): { services: ListServicePresenterOutput[] } {
    return {
      services: services.map((s) => {
        return {
          id: s.id,
          name: s.name,
          description: s.description,
          icon: s.icon
        };
      })
    };
  }
}

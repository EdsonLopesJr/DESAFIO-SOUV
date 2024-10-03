import { ServiceGateway } from '../../../domain/gateway/service.gateway';
import { Usecase } from '../../usecase';
import { ListServicePresenter } from './list-service.presenter';

export type ListServiceInputDto = void;

export type ListServiceOutputDto = {
  services: {
    id: string;
    name: string;
    description: string;
    icon: string;
  }[];
};

// Implementa o caso de uso para a listagem de serviços
export class ListServiceUsecase implements Usecase<ListServiceInputDto, ListServiceOutputDto> {
  private constructor(private readonly serviceGateway: ServiceGateway) {}

  public static create(serviceGateway: ServiceGateway) {
    return new ListServiceUsecase(serviceGateway);
  }

  // O método execute busca os serviços do gateway e os apresenta através do ListServicePresenter
  public async execute(): Promise<ListServiceOutputDto> {
    const aServices = await this.serviceGateway.list();
    return ListServicePresenter.present(aServices);
  }
}

import { Service } from '../../../domain/entities/service.entity';
import { ServiceGateway } from '../../../domain/gateway/service.gateway';
import { Usecase } from '../../usecase';
import { CreateServicePresenter } from './create-service.presenter';

export type CreateServiceInputDto = {
  name: string;
  description: string;
  icon: string;
};

export type CreateServiceOutputDto = {
  id: string;
};

// Implementação do caso de uso para criar um serviço
export class CreateServiceUsecase implements Usecase<CreateServiceInputDto, CreateServiceOutputDto> {
  // Construtor privado para forçar o uso do método de fábrica
  private constructor(private readonly serviceGateway: ServiceGateway) {}

  // Método de fábrica para criar uma instância de CreateServiceUsecase
  public static create(serviceGateway: ServiceGateway) {
    return new CreateServiceUsecase(serviceGateway);
  }

  // Método que executa a lógica de criação do serviço
  public async execute({ name, description, icon }: CreateServiceInputDto): Promise<CreateServiceOutputDto> {
    //o padrão de design Command

    // Cria uma nova instância da entidade Service
    const aService = Service.create(name, description, icon);

    // Persiste o serviço usando o gateway
    await this.serviceGateway.save(aService);

    // Apresenta a saída formatada usando o presenter
    return CreateServicePresenter.present(aService);
  }
}

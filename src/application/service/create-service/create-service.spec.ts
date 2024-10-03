import { ServiceGateway } from '../../../domain/gateway/service.gateway';
import { CreateServiceInputDto, CreateServiceUsecase } from './create-service.usecase';

const mockServiceGateway: ServiceGateway = {
  save: jest.fn()
};

describe('CreateServiceUsecase', () => {
  let usecase: CreateServiceUsecase;

  beforeEach(() => {
    usecase = CreateServiceUsecase.create(mockServiceGateway);
  });

  test('Deve criar um serviço e retornar um id', async () => {
    const { name, description, icon }: CreateServiceInputDto = {
      name: 'Teste service',
      description: 'Este é um serviço de teste',
      icon: 'test-icon.png'
    };

    const output = await usecase.execute({ name, description, icon });

    // Verifica se o serviço foi salvo
    expect(mockServiceGateway.save).toHaveBeenCalled();

    // Verifica se o resultado contém um ID
    expect(output).toHaveProperty('id');

    // Verifica se o ID não é nulo ou indefinido (assumindo que a lógica de criação de serviços gera um ID)
    expect(output.id).toBeDefined();
  });
});

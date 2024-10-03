import { InvalidParamError } from '../../../domain/exceptions/invalid-params-error';
import { ServiceGateway } from '../../../domain/gateway/service.gateway';
import { ServerError } from '../../exception/server-error';
import { CreateServiceInputDto, CreateServiceUsecase } from './create-service.usecase';

const mockServiceGateway: jest.Mocked<ServiceGateway> = {
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

  test('Deve lançar um erro se o nome do serviço estiver vazio', async () => {
    const input: CreateServiceInputDto = {
      name: '', // Nome vazio
      description: 'Este é um serviço de teste',
      icon: 'test-icon.png'
    };

    // Espera que o caso de uso lance um InvalidParamError com o parâmetro 'name'
    await expect(usecase.execute(input)).rejects.toThrow(new InvalidParamError('name'));
  });

  test('Deve lançar um erro se a descrição do serviço estiver vazia', async () => {
    const input: CreateServiceInputDto = {
      name: 'Teste service',
      description: '', // Descrição vazia
      icon: 'test-icon.png'
    };

    // Espera que o caso de uso lance um InvalidParamError com o parâmetro 'description'
    await expect(usecase.execute(input)).rejects.toThrow(new InvalidParamError('description'));
  });

  test('Deve lançar um erro se o ícone do serviço estiver vazio', async () => {
    const input: CreateServiceInputDto = {
      name: 'Teste service',
      description: 'Este é um serviço de teste',
      icon: '' // Ícone vazio
    };
    // Espera que o caso de uso lance um InvalidParamError com o parâmetro 'icon'
    await expect(usecase.execute(input)).rejects.toThrow(new InvalidParamError('icon'));
  });

  test('Deve lançar um erro de servidor se ocorrer um erro ao salvar o serviço', async () => {
    const input: CreateServiceInputDto = {
      name: 'Teste service',
      description: 'Este é um serviço de teste',
      icon: 'test-icon.png'
    };

    // Simula uma falha no método save do gateway
    mockServiceGateway.save.mockRejectedValueOnce(new ServerError());

    // Espera que o caso de uso lance um ServerError
    await expect(usecase.execute(input)).rejects.toThrow(ServerError);
  });
});

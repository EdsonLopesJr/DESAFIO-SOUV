import { ServiceGateway } from '../../../domain/service/gateway/service.gateway';
import { ListServiceUsecase, ListServiceOutputDto } from './list-service.usecase';
import { Service } from '../../../domain/service/entities/service.entity';
import { ServerError } from '../../exception/server-error';

const mockServiceGateway: Partial<ServiceGateway> = {
  list: jest.fn()
};

describe('ListServiceUsecase', () => {
  let usecase: ListServiceUsecase;

  beforeEach(() => {
    usecase = ListServiceUsecase.create(mockServiceGateway as ServiceGateway);
  });

  test('Deve listar serviços e retornar seus valores', async () => {
    // Cria um array de serviços simulados
    const servicesMock: Service[] = [
      Service.create('Service 1', 'Description 1', 'icon1.png'),
      Service.create('Service 2', 'Description 2', 'icon2.png')
    ];

    // Simula o retorno do método list do gateway
    mockServiceGateway.list = jest.fn().mockResolvedValueOnce(servicesMock);

    // Executa o caso de uso
    const output: ListServiceOutputDto = await usecase.execute();

    // Verifica se o método list foi chamado
    expect(mockServiceGateway.list).toHaveBeenCalled();

    // Verifica se o resultado contém os serviços corretos
    expect(output).toEqual({
      services: [
        { id: output.services[0].id, name: 'Service 1', description: 'Description 1', icon: 'icon1.png' },
        { id: output.services[1].id, name: 'Service 2', description: 'Description 2', icon: 'icon2.png' }
      ]
    });
  });

  test('Deve retornar um array vazio se não houver serviços', async () => {
    // Simula o retorno de um array vazio
    mockServiceGateway.list = jest.fn().mockResolvedValueOnce([]);

    // Executa o caso de uso
    const output: ListServiceOutputDto = await usecase.execute();

    // Verifica se o resultado contém um array vazio
    expect(output).toEqual({ services: [] });
  });

  test('Deve lançar um erro de servidor se ocorrer um erro ao listar serviços', async () => {
    // Simula uma falha no método list do gateway
    mockServiceGateway.list = jest.fn().mockRejectedValueOnce(new ServerError());

    // Espera que o caso de uso lance um ServerError
    await expect(usecase.execute()).rejects.toThrow(ServerError);
  });
});

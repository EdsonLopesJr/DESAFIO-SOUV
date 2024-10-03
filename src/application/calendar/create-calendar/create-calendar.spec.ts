import { CreateCalendarUsecase } from './create-calendar.usecase';
import { InvalidParamError } from '../../../domain/service/exceptions/invalid-params-error';
import { CalendarGateway } from '../../../domain/calendar/gateway/calendar.gateway';
import { ServiceGateway } from '../../../domain/service/gateway/service.gateway';
import { Service } from '../../../domain/service/entities/service.entity';

describe('CreateCalendarUsecase', () => {
  let createCalendarUsecase: CreateCalendarUsecase;
  let calendarGateway: jest.Mocked<CalendarGateway>;
  let serviceGateway: jest.Mocked<ServiceGateway>;

  beforeEach(() => {
    // Mock do calendarGateway
    calendarGateway = {
      save: jest.fn(),
      findById: jest.fn(),
      list: jest.fn()
    };

    // Mock do serviceGateway
    serviceGateway = {
      findById: jest.fn(),
      save: jest.fn(),
      list: jest.fn()
    };

    // Instanciando o caso de uso com os gateways mockados
    createCalendarUsecase = CreateCalendarUsecase.create(calendarGateway, serviceGateway);
  });

  test('deve criar um agendamento com sucesso', async () => {
    // Mock de um serviço encontrado
    const mockService = Service.create('Corte de cabelo', 'Corte simples', 'icon.png');
    serviceGateway.findById.mockResolvedValue(mockService);

    const inputDto = {
      name: 'agendamento qualquer',
      phone: '123456789',
      serviceIds: ['service-id-1', 'service-id-2'],
      timestamp: new Date()
    };

    // Chama o método execute e espera um retorno de sucesso
    const result = await createCalendarUsecase.execute(inputDto);

    // Verifica se o calendarGateway.save foi chamado
    expect(calendarGateway.save).toHaveBeenCalledTimes(1);
    expect(result).toHaveProperty('id');
  });

  test('deve lançar erro ao tentar agendar um serviço que não existe', async () => {
    // Mock que simula serviço não encontrado
    serviceGateway.findById.mockResolvedValue(null);

    const inputDto = {
      name: 'João',
      phone: '123456789',
      serviceIds: ['service-id-1'], // O service-id-1 não existe
      timestamp: new Date()
    };

    // Espera que a execução do caso de uso lance um erro
    await expect(createCalendarUsecase.execute(inputDto)).rejects.toThrow(new InvalidParamError('ServiceId'));
    expect(serviceGateway.findById).toHaveBeenCalledWith('service-id-1');
    expect(calendarGateway.save).not.toHaveBeenCalled();
  });

  test('deve lançar erro ao tentar criar um agendamento com parâmetros inválidos', async () => {
    // Input DTO com dados inválidos (por exemplo, sem serviceIds)
    const inputDto = {
      name: '',
      phone: '',
      serviceIds: [], // Nenhum serviço selecionado
      timestamp: new Date()
    };

    // Espera que a execução lance um erro
    await expect(createCalendarUsecase.execute(inputDto)).rejects.toThrow(Error);
    expect(calendarGateway.save).not.toHaveBeenCalled(); // Certifica-se que save não foi chamado
  });
});

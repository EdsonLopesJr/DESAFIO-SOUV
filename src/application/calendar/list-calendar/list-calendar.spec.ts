import { ListCalendarUsecase } from './list-calendar.usecase';
import { CalendarGateway } from '../../../domain/calendar/gateway/calendar.gateway';
import { Service } from '../../../domain/service/entities/service.entity';
import { Calendar } from '../../../domain/calendar/entities/calendar.entity';

describe('ListCalendarUsecase', () => {
  let listCalendarUsecase: ListCalendarUsecase;
  let calendarGateway: jest.Mocked<CalendarGateway>;

  beforeEach(() => {
    // Mock do CalendarGateway
    calendarGateway = {
      list: jest.fn(),
      save: jest.fn(),
      findById: jest.fn()
    };

    // Instancia o caso de uso com o gateway mockado
    listCalendarUsecase = ListCalendarUsecase.create(calendarGateway);
  });

  test('deve listar os agendamentos com sucesso', async () => {
    // Mock de um agendamento com serviços
    const mockService1 = Service.create('Corte de cabelo', 'Corte simples', 'icon.png');
    const mockService2 = Service.create('Manicure', 'Cuidado das unhas', 'icon.png');
    const mockCalendar = Calendar.create('Cliente', '123456789', [mockService1, mockService2], new Date());

    // Mock para retornar a lista de agendamentos
    calendarGateway.list.mockResolvedValue([mockCalendar]);

    // Executa o caso de uso
    const output = await listCalendarUsecase.execute();

    // Verifica se o calendarGateway.list foi chamado
    expect(calendarGateway.list).toHaveBeenCalledTimes(1);

    // Verifica se o resultado está formatado corretamente
    expect(output.calendars).toHaveLength(1);
    expect(output.calendars[0]).toHaveProperty('id', mockCalendar.id);
    expect(output.calendars[0].services).toHaveLength(2);
    expect(output.calendars[0].services[0]).toHaveProperty('id', mockService1.id);
    expect(output.calendars[0].services[1]).toHaveProperty('id', mockService2.id);
  });

  test('deve retornar uma lista vazia quando não houver agendamentos', async () => {
    // Mock para retornar uma lista vazia
    calendarGateway.list.mockResolvedValue([]);

    // Executa o caso de uso
    const output = await listCalendarUsecase.execute();

    // Verifica se o resultado é uma lista vazia
    expect(output.calendars).toHaveLength(0);
  });

  test('deve lançar um erro se o gateway falhar', async () => {
    // Simula uma falha no CalendarGateway
    calendarGateway.list.mockRejectedValue(new Error('Erro no Gateway'));

    // Espera que o uso do caso lance um erro
    await expect(listCalendarUsecase.execute()).rejects.toThrow('Erro no Gateway');
  });
});

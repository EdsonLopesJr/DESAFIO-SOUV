import { Calendar } from '../../../domain/calendar/entities/calendar.entity';
import { ServiceGateway } from '../../../domain/service/gateway/service.gateway'; // ServiceGateway vem do contexto de serviços
import { Usecase } from '../../usecase';
import { CreateCalendarPresenter } from './create-calendar.presenter';
import { InvalidParamError } from '../../../domain/service/exceptions/invalid-params-error';
import { CalendarGateway } from '../../../domain/calendar/gateway/calendar.gateway';
import { ServerError } from '../../exception/server-error';

export type CreateCalendarInputDto = {
  name: string;
  phone: string;
  serviceIds: string[]; // IDs dos serviços selecionados
  timestamp: Date;
};

export type CreateCalendarOutputDto = {
  id: string;
};

// Implementação do caso de uso para criar um agendamento
export class CreateCalendarUsecase implements Usecase<CreateCalendarInputDto, CreateCalendarOutputDto> {
  private constructor(
    private readonly calendarGateway: CalendarGateway,
    private readonly serviceGateway: ServiceGateway // Para buscar serviços existentes
  ) {}

  // Método de fábrica para criar uma instância de CreateCalendarUsecase
  public static create(calendarGateway: CalendarGateway, serviceGateway: ServiceGateway) {
    return new CreateCalendarUsecase(calendarGateway, serviceGateway);
  }

  // Método que executa a lógica de criação do agendamento
  public async execute({
    name,
    phone,
    serviceIds,
    timestamp
  }: CreateCalendarInputDto): Promise<CreateCalendarOutputDto> {
    try {
      // Busca os serviços pelo ID
      const services = [];
      for (const serviceId of serviceIds) {
        const service = await this.serviceGateway.findById(serviceId); // Garantir que retorna um objeto Service
        if (!service) {
          throw new InvalidParamError('ServiceId');
        }
        services.push(service); // Adicionar o service no array de services
      }

      // Cria um novo agendamento
      const calendar = Calendar.create(name, phone, services, timestamp);

      // Persiste o agendamento usando o gateway
      await this.calendarGateway.save(calendar);

      // Apresenta a saída formatada usando o presenter
      return CreateCalendarPresenter.present(calendar);
    } catch (error) {
      if (error instanceof InvalidParamError) {
        throw new Error(error.message);
      }
      if (error instanceof ServerError) {
        throw new ServerError();
      }

      throw error;
    }
  }
}

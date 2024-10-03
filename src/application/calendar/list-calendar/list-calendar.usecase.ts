import { CalendarGateway } from '../../../domain/calendar/gateway/calendar.gateway';
import { Usecase } from '../../usecase';
import { ListCalendarPresenter } from './list-calendar.presenter';
import { ServerError } from '../../../application/exception/server-error';

export type ListCalendarOutputDto = {
  calendars: {
    id: string;
    name: string;
    phone: string;
    services: {
      id: string;
      name: string;
    }[];
    timestamp: Date;
  }[];
};

// Implementa o caso de uso para listagem de agendamentos
export class ListCalendarUsecase implements Usecase<void, ListCalendarOutputDto> {
  private constructor(private readonly calendarGateway: CalendarGateway) {}

  public static create(calendarGateway: CalendarGateway) {
    return new ListCalendarUsecase(calendarGateway);
  }

  // O método execute busca os agendamentos no gateway e os apresenta através do ListCalendarPresenter
  public async execute(): Promise<ListCalendarOutputDto> {
    try {
      const calendars = await this.calendarGateway.list(); // Busca a lista de agendamentos
      return ListCalendarPresenter.present(calendars); // // Apresenta a saída formatada usando o presenter
    } catch (error) {
      if (error instanceof ServerError) {
        throw new ServerError();
      }

      throw error;
    }
  }
}

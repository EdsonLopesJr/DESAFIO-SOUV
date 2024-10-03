import { Calendar } from '../../../domain/calendar/entities/calendar.entity';
import { ListCalendarOutputDto } from './list-calendar.usecase';

// O presenter da lista de agendamentos
export class ListCalendarPresenter {
  public static present(calendars: Calendar[]): ListCalendarOutputDto {
    return {
      calendars: calendars.map((calendar) => ({
        id: calendar.id,
        name: calendar.name,
        phone: calendar.phone,
        services: calendar.services.map((service) => ({
          id: service.id,
          name: service.name
        })),
        timestamp: calendar.timestamp
      }))
    };
  }
}

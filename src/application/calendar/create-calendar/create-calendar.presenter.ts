import { Calendar } from '../../../domain/calendar/entities/calendar.entity';
import { CreateCalendarOutputDto } from './create-calendar.usecase';

export class CreateCalendarPresenter {
  public static present(calendar: Calendar): CreateCalendarOutputDto {
    return {
      id: calendar.id
    };
  }
}

import { Calendar } from '../entities/calendar.entity';

// Define a interface ServiceGateway para a persistência de dados
export interface CalendarGateway {
  // Método que deve ser implementado para salvar, listar, pesquisar agendamento
  save(calendar: Calendar): Promise<void>;
  findById(id: string): Promise<Calendar | null>;
  list(): Promise<Calendar[]>;
}

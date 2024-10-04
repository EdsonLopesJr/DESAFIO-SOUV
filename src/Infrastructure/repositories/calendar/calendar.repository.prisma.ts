import { PrismaClient } from '@prisma/client';
import { CalendarGateway } from '../../../domain/calendar/gateway/calendar.gateway';
import { Calendar } from '../../../domain/calendar/entities/calendar.entity';
import { Service } from '../../../domain/service/entities/service.entity';

// Classe que implementa o repositório para a entidade Calendar, utilizando o Prisma ORM.
export class CalendarRepository implements CalendarGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}

  // Método estático para criar uma instância do CalendarRepository.
  public static create(prismaClient: PrismaClient) {
    return new CalendarRepository(prismaClient);
  }

  // Método para salvar um novo calendário no banco de dados.
  public async save(calendar: Calendar): Promise<void> {
    const data = {
      id: calendar.id,
      name: calendar.name,
      phone: calendar.phone,
      timestamp: calendar.timestamp,
      CalendarToService: {
        create: calendar.services.map((service) => ({
          serviceId: service.id
        }))
      }
    };

    // Salva o calendário no banco de dados.
    await this.prismaClient.calendar.create({
      data
    });
  }

  // Método para listar todos os agendamento no banco de dados.
  public async list(): Promise<Calendar[]> {
    const calendars = await this.prismaClient.calendar.findMany({
      include: {
        CalendarToService: {
          include: {
            service: true
          }
        }
      }
    });

    const calendarList = calendars.map((c) => {
      const services = c.CalendarToService.map((cs) => cs.service);

      const calendar = Calendar.with({
        id: c.id,
        name: c.name,
        phone: c.phone,
        services: services.map((s) =>
          Service.with({
            id: s.id,
            name: s.name,
            description: s.description,
            icon: s.icon
          })
        ),
        timestamp: c.timestamp
      });
      return calendar;
    });

    return calendarList;
  }

  // Método para encontrar um calendário específico pelo ID.
  public async findById(id: string): Promise<Calendar | null> {
    const calendar = await this.prismaClient.calendar.findUnique({
      where: { id },
      include: {
        CalendarToService: {
          include: {
            service: true // Inclui os detalhes do serviço associado
          }
        }
      }
    });

    // Se o agendamento não for encontrado, retorna null (Aplicar Exception Depois rsrsrs')
    if (!calendar) {
      return null;
    }

    // Mapeia o agendamento retornado para uma instância da entidade Calendar
    const services = calendar.CalendarToService.map((cs) => cs.service);

    return Calendar.with({
      id: calendar.id,
      name: calendar.name,
      phone: calendar.phone,
      services: services.map((s) =>
        Service.with({
          id: s.id,
          name: s.name,
          description: s.description,
          icon: s.icon
        })
      ),
      timestamp: calendar.timestamp
    });
  }
}

import { Request, Response } from 'express';
import {
  ListCalendarOutputDto,
  ListCalendarUsecase
} from '../../../../../application/calendar/list-calendar/list-calendar.usecase';
import { HttpMethod, Route } from '../route';
import { ServerError } from '../../../../../application/exception/server-error';

// Define a estrutura do DTO de resposta para a listagem de calendários.
export type ListCalendarResponseDto = {
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

// Classe que implementa a rota para listar calendários.
export class ListCalendarRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listCalendarService: ListCalendarUsecase
  ) {}

  public static create(listCalendarService: ListCalendarUsecase) {
    return new ListCalendarRoute('/calendars', HttpMethod.GET, listCalendarService);
  }

  public getMethod(): HttpMethod {
    return this.method;
  }

  public getPath(): string {
    return this.path;
  }

  // Método que retorna o manipulador da rota.
  public getHandler(): (request: Request, response: Response) => Promise<void> {
    return async (request: Request, response: Response) => {
      try {
        // Executa o caso de uso de listagem de calendários e obtém a saída.
        const output = await this.listCalendarService.execute();

        const responseBody = this.present(output);

        // Retorna a resposta com status 200 e o corpo da resposta.
        response.status(200).json(responseBody);
      } catch (error) {
        if (error instanceof ServerError) {
          response.status(500).json({
            message: error.message
          });
        } else {
          response.status(500).json({
            message: 'Unexpected error occurred'
          });
        }
      }
    };
  }

  // Método para formatar a resposta de saída.
  private present(input: ListCalendarOutputDto): ListCalendarResponseDto {
    const response: ListCalendarResponseDto = {
      calendars: input.calendars.map((calendar) => ({
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

    return response;
  }
}

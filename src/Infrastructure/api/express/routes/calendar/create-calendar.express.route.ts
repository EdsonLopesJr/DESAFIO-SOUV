import { Request, Response } from 'express';
import {
  CreateCalendarInputDto,
  CreateCalendarOutputDto,
  CreateCalendarUsecase
} from '../../../../../application/calendar/create-calendar/create-calendar.usecase';
import { HttpMethod, Route } from '../route';
import { MissingServiceError } from '../../../../../application/exception/missing-service-error';
import { ServerError } from '../../../../../application/exception/server-error';
import { ServiceNotFoundError } from '../../../../../application/exception/service-not-found-error';

export type CreateCalendarResponseDto = {
  id: string;
};

// Classe que implementa a rota para criar um agendamento.
export class CreateCalendarRoute implements Route {
  // Construtor para garantir que a classe só seja instanciada através do método create.
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createCalendarService: CreateCalendarUsecase
  ) {}

  // Método estático para criar uma instância da rota de criação de calendário.
  public static create(createCalendarService: CreateCalendarUsecase) {
    return new CreateCalendarRoute('/calendar', HttpMethod.POST, createCalendarService);
  }

  // Método que retorna o manipulador da rota.
  public getHandler(): (request: Request, response: Response) => Promise<void> {
    return async (request: Request, response: Response) => {
      try {
        const { name, phone, serviceIds, timestamp } = request.body;

        const input: CreateCalendarInputDto = {
          name,
          phone,
          serviceIds,
          timestamp
        };

        // Chama o caso de uso e obtém a saída
        const output: CreateCalendarOutputDto = await this.createCalendarService.execute(input);

        const responseBody = this.present(output);

        // Retorna a resposta com status 201 e o corpo da resposta
        response.status(201).json(responseBody);
      } catch (error) {
        if (error instanceof MissingServiceError || error instanceof ServiceNotFoundError) {
          response.status(400).json({
            message: error.message
          });
        } else if (error instanceof ServerError) {
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

  public getMethod(): HttpMethod {
    return this.method;
  }

  public getPath(): string {
    return this.path;
  }

  // Método para formatar a resposta.
  private present(input: CreateCalendarResponseDto): CreateCalendarResponseDto {
    const response = { id: input.id };
    return response;
  }
}

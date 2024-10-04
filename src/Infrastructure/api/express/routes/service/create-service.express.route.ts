import { Request, Response } from 'express';
import {
  CreateServiceInputDto,
  CreateServiceUsecase
} from '../../../../../application/service/create-service/create-service.usecase';
import { HttpMethod, Route } from '../route';
import { InvalidParamError } from '../../../../../domain/service/exceptions/invalid-params-error';
import { ServerError } from '../../../../../application/exception/server-error';

export type CreateServiceResponseDto = {
  id: string;
};

export class CreateServiceRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createServiceService: CreateServiceUsecase
  ) {}

  public static create(createServiceService: CreateServiceUsecase) {
    return new CreateServiceRoute('/service', HttpMethod.POST, createServiceService);
  }

  // Função que retorna o handler da rota, que é a função executada ao receber uma requisição
  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const { name, description, icon } = request.body;

        // Cria o DTO de entrada com os dados do corpo da requisição
        const input: CreateServiceInputDto = {
          name,
          description,
          icon
        };

        // Executa o caso de uso de criação de serviço com os dados de entrada
        const output: CreateServiceResponseDto = await this.createServiceService.execute(input);
        const responseBody = this.present(output);

        response.status(201).json(responseBody).send();
      } catch (error) {
        if (error instanceof InvalidParamError) {
          response.status(400).json({
            message: error.message
          });
        } else if (error instanceof ServerError) {
          response.status(500).json({
            message: error.message
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

  // Método Presenter para formatar a resposta de saída
  private present(input: CreateServiceResponseDto): CreateServiceResponseDto {
    const response = { id: input.id };
    return response;
  }
}

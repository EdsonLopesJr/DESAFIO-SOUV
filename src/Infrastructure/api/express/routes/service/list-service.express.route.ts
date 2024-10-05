import { Request, Response } from 'express';
import {
  ListServiceOutputDto,
  ListServiceUsecase
} from '../../../../../application/service/list-service/list-service.usecase';
import { HttpMethod, Route } from '../route';
import { ServerError } from '../../../../../application/exception/server-error';

export type ListServiceResponseDto = {
  services: {
    id: string;
    name: string;
    description: string;
    icon: string;
  }[];
};

export class ListServiceRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listServiceService: ListServiceUsecase
  ) {}

  // Construtor privado para controlar a criação da instância
  public static create(listServiceService: ListServiceUsecase) {
    return new ListServiceRoute('/services', HttpMethod.GET, listServiceService);
  }

  // Função que retorna o handler da rota, que é a função executada ao receber uma requisição
  public getHandler(): (request: Request, response: Response) => Promise<void> {
    return async (request: Request, response: Response) => {
      try {
        // Executa o caso de uso de listagem de serviços
        const output = await this.listServiceService.execute();

        // Prepara a resposta com os dados dos serviços listados
        const responseBody = this.present(output);

        // Envia a resposta com status 200 (OK) e o corpo contendo os serviços listados
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

  public getMethod(): HttpMethod {
    return this.method;
  }

  public getPath(): string {
    return this.path;
  }

  // Método para formatar a resposta de saída
  private present(input: ListServiceOutputDto): ListServiceResponseDto {
    const response: ListServiceResponseDto = {
      services: input.services.map((s) => ({
        id: s.id,
        name: s.name,
        description: s.description,
        icon: s.icon
      }))
    };

    return response;
  }
}

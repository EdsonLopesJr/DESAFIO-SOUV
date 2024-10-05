import { ServerError } from '../../../../../application/exception/server-error';
import {
  ListTestimonialOutputDto,
  ListTestimonialUsecase
} from '../../../../../application/testimonial/list-testimonial/list-testimonial.usecase';
import { HttpMethod, Route } from '../route';
import { Request, Response } from 'express';

export type ListTestimonialResponseDto = {
  testimonials: {
    id: string;
    name: string;
    message: string;
    profile: string | undefined;
  }[];
};

export class ListTestimonialRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listTestimonialTestimonial: ListTestimonialUsecase
  ) {}

  // Construtor privado para controlar a criação da instância
  public static create(listTestimonialTestimonial: ListTestimonialUsecase) {
    return new ListTestimonialRoute('/testimonials', HttpMethod.GET, listTestimonialTestimonial);
  }

  // Função que retorna o handler da rota, que é a função executada ao receber uma requisição
  public getHandler(): (request: Request, response: Response) => Promise<void> {
    return async (request: Request, response: Response) => {
      try {
        // Executa o caso de uso de listagem de depoimentos
        const output = await this.listTestimonialTestimonial.execute();

        // Prepara a resposta com os dados dos depoimentos listados
        const responseBody = this.present(output);

        // Envia a resposta com status 200 (OK) e o corpo contendo os depoimentos listados
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
  private present(input: ListTestimonialOutputDto): ListTestimonialResponseDto {
    const response: ListTestimonialResponseDto = {
      testimonials: input.testimonials.map((t) => ({
        id: t.id,
        name: t.name,
        message: t.message,
        profile: t.profile
      }))
    };

    return response;
  }
}

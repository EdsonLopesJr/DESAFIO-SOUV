import { Request, Response } from 'express';
import {
  CreateTestimonialInputDto,
  CreateTestimonialUsecase
} from '../../../../../application/testimonial/create-testimonial/create-testimonial.usecase';
import { HttpMethod, Route } from '../route';
import { InvalidParamError } from '../../../../../domain/service/exceptions/invalid-params-error';
import { ServerError } from '../../../../../application/exception/server-error';

export type CreateTestimonialResponseDto = {
  id: string;
};

export class CreateTestimonialRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createTestimonialService: CreateTestimonialUsecase
  ) {}

  public static create(createTestimonialService: CreateTestimonialUsecase) {
    return new CreateTestimonialRoute('/testimonial', HttpMethod.POST, createTestimonialService);
  }

  public getMethod(): HttpMethod {
    return this.method;
  }

  public getPath(): string {
    return this.path;
  }

  public getHandler(): (request: Request, response: Response) => Promise<void> {
    return async (request: Request, response: Response) => {
      try {
        const { name, message } = request.body;

        const input: CreateTestimonialInputDto = {
          name,
          message
        };

        const output: CreateTestimonialResponseDto = await this.createTestimonialService.execute(input);

        const responseBody = this.present(output);

        response.status(201).json(responseBody);
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
  private present(input: CreateTestimonialResponseDto): CreateTestimonialResponseDto {
    const response = { id: input.id };
    return response;
  }
}

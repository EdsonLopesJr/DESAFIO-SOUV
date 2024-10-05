import { InvalidParamError } from '../../../domain/service/exceptions/invalid-params-error';
import { Testimonial } from '../../../domain/testimonial/entities/testimonial.entity';
import { TestimonialGateway } from '../../../domain/testimonial/gateway/testimonial.gateway';
import { ServerError } from '../../exception/server-error';
import { Usecase } from '../../usecase';
import { CreateTestimonialPresenter } from './create-testimonial.present';

export type CreateTestimonialInputDto = {
  name: string;
  message: string;
  profile: string | undefined;
};

export type CreateTestimonialOutputDto = {
  id: string;
};

export class CreateTestimonialUsecase implements Usecase<CreateTestimonialInputDto, CreateTestimonialOutputDto> {
  private constructor(private readonly testimonialGateway: TestimonialGateway) {}

  public static create(testimonial: TestimonialGateway) {
    return new CreateTestimonialUsecase(testimonial);
  }

  public async execute({ name, message, profile }: CreateTestimonialInputDto): Promise<CreateTestimonialOutputDto> {
    try {
      const testimonial = Testimonial.create(name, message, profile);

      await this.testimonialGateway.save(testimonial);

      return CreateTestimonialPresenter.present(testimonial);
    } catch (error) {
      if (error instanceof InvalidParamError) {
        throw new Error(error.message);
      }

      if (error instanceof InvalidParamError) {
        throw new Error(error.message);
      }
      if (error instanceof ServerError) {
        throw new ServerError();
      }

      throw error;
    }
  }
}

import { TestimonialGateway } from '../../../domain/testimonial/gateway/testimonial.gateway';
import { ServerError } from '../../exception/server-error';
import { Usecase } from '../../usecase';
import { ListTestimonialPresenter } from './list-testimonial.presenter';

export type ListTestimonialInputDto = void;

export type ListTestimonialOutputDto = {
  testimonials: {
    id: string;
    name: string;
    message: string;
  }[];
};

type NewType = TestimonialGateway;

// Implementa o caso de uso para a listagem de serviços
export class ListTestimonialUsecase implements Usecase<ListTestimonialInputDto, ListTestimonialOutputDto> {
  private constructor(private readonly testimonialGateway: NewType) {}

  public static create(testimonialGateway: TestimonialGateway) {
    return new ListTestimonialUsecase(testimonialGateway);
  }

  // O método execute busca os serviços do gateway e os apresenta através do ListTestimonialPresenter
  public async execute(): Promise<ListTestimonialOutputDto> {
    try {
      const aTestimonials = await this.testimonialGateway.list();
      return ListTestimonialPresenter.present(aTestimonials);
    } catch (error) {
      if (error instanceof ServerError) {
        throw new ServerError();
      }

      throw error;
    }
  }
}

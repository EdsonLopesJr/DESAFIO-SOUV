import { Testimonial } from '../../../domain/testimonial/entities/testimonial.entity';

export interface CreateTestimonialPresenterOutput {
  id: string;
}

export class CreateTestimonialPresenter {
  public static present(testimonial: Testimonial): CreateTestimonialPresenterOutput {
    return {
      id: testimonial.id
    };
  }
}

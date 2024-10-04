import { Testimonial } from '../entities/testimonial.entity';

export interface TestimonialGateway {
  save(testimonial: Testimonial): Promise<void>;
  list(): Promise<Testimonial[]>;
}

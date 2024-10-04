import { Testimonial } from '../../../domain/testimonial/entities/testimonial.entity';

export interface ListTestimonialPresenterOutput {
  id: string;
  name: string;
  message: string;
}

// Classe responsável por apresentar a saída do caso de uso da listagem de serviço
export class ListTestimonialPresenter {
  // Método estático que transforma a entidade Testimonial em um objeto de saída
  public static present(testimonials: Testimonial[]): { testimonials: ListTestimonialPresenterOutput[] } {
    return {
      testimonials: testimonials.map((t) => {
        return {
          id: t.id,
          name: t.name,
          message: t.message
        };
      })
    };
  }
}

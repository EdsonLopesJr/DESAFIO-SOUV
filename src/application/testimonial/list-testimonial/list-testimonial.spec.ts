import { Testimonial } from '../../../domain/testimonial/entities/testimonial.entity';
import { TestimonialGateway } from '../../../domain/testimonial/gateway/testimonial.gateway';
import { ServerError } from '../../exception/server-error';
import { ListTestimonialOutputDto, ListTestimonialUsecase } from './list-testimonial.usecase';

const mockTestimonialGateway: Partial<TestimonialGateway> = {
  list: jest.fn()
};

describe('ListTestimonialUsecase', () => {
  let usecase: ListTestimonialUsecase;

  beforeEach(() => {
    usecase = ListTestimonialUsecase.create(mockTestimonialGateway as TestimonialGateway);
  });

  test('Deve listar depoimentos e retornar seus valores', async () => {
    // Cria um array de depoimentos simulados
    const testimonialsMock: Testimonial[] = [
      Testimonial.create('testimonial 1', 'Message 1'),
      Testimonial.create('testimonial 2', 'Message 2')
    ];

    // Simula o retorno do método list do gateway
    mockTestimonialGateway.list = jest.fn().mockResolvedValueOnce(testimonialsMock);

    // Executa o caso de uso
    const output: ListTestimonialOutputDto = await usecase.execute();

    // Verifica se o método list foi chamado
    expect(mockTestimonialGateway.list).toHaveBeenCalled();

    // Verifica se o resultado contém os depoimentos corretos
    expect(output).toEqual({
      testimonials: [
        { id: output.testimonials[0].id, name: 'testimonial 1', message: 'Message 1' },
        { id: output.testimonials[1].id, name: 'testimonial 2', message: 'Message 2' }
      ]
    });
  });

  test('Deve retornar um array vazio se não houver depoimentos', async () => {
    // Simula o retorno de um array vazio
    mockTestimonialGateway.list = jest.fn().mockResolvedValueOnce([]);

    // Executa o caso de uso
    const output: ListTestimonialOutputDto = await usecase.execute();

    // Verifica se o resultado contém um array vazio
    expect(output).toEqual({ testimonials: [] });
  });

  test('Deve lançar um erro de servidor se ocorrer um erro ao listar depoimentos', async () => {
    // Simula uma falha no método list do gateway
    mockTestimonialGateway.list = jest.fn().mockRejectedValueOnce(new ServerError());

    // Espera que o caso de uso lance um ServerError
    await expect(usecase.execute()).rejects.toThrow(ServerError);
  });
});

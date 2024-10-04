import { InvalidParamError } from '../../../domain/service/exceptions/invalid-params-error';
import { TestimonialGateway } from '../../../domain/testimonial/gateway/testimonial.gateway';
import { ServerError } from '../../exception/server-error';
import { CreateTestimonialInputDto, CreateTestimonialUsecase } from './create-testimonial.usecase';

const mockTestimonialGateway: Partial<TestimonialGateway> = {
  save: jest.fn()
};

describe('CreateTestimonialUsecase', () => {
  let usecase: CreateTestimonialUsecase;

  beforeEach(() => {
    usecase = CreateTestimonialUsecase.create(mockTestimonialGateway as TestimonialGateway);
  });

  test('Deve criar um depoimento e retornar um id', async () => {
    const { name, message }: CreateTestimonialInputDto = {
      name: 'Teste Testimonial',
      message: 'messagem'
    };

    const output = await usecase.execute({ name, message });

    // Verifica se o depoimento foi salvo
    expect(mockTestimonialGateway.save).toHaveBeenCalled();

    // Verifica se o resultado contém um ID
    expect(output).toHaveProperty('id');

    // Verifica se o ID não é nulo ou indefinido (assumindo que a lógica de criação de depoimentos gera um ID)
    expect(output.id).toBeDefined();
  });

  test('Deve lançar um erro se o nome do depoimento estiver vazio', async () => {
    const input: CreateTestimonialInputDto = {
      name: '', // Nome vazio
      message: 'message'
    };

    // Espera que o caso de uso lance um InvalidParamError com o parâmetro 'name'
    await expect(usecase.execute(input)).rejects.toThrow(new InvalidParamError('name'));
  });

  test('Deve lançar um erro se a descrição do depoimento estiver vazia', async () => {
    const input: CreateTestimonialInputDto = {
      name: 'Teste Testimonial',
      message: ''
    };

    // Espera que o caso de uso lance um InvalidParamError com o parâmetro 'description'
    await expect(usecase.execute(input)).rejects.toThrow(new InvalidParamError('message'));
  });

  test('Deve lançar um erro de servidor se ocorrer um erro ao salvar o depoimento', async () => {
    const input: CreateTestimonialInputDto = {
      name: 'Teste Testimonial',
      message: 'Este é um depoimento de teste'
    };

    // Simula uma falha no método save do gateway
    jest.spyOn(mockTestimonialGateway, 'save').mockImplementationOnce(() => {
      throw new ServerError();
    });
    // Espera que o caso de uso lance um ServerError
    await expect(usecase.execute(input)).rejects.toThrow(ServerError);
  });
});

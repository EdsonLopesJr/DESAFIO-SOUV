// Define uma interface genérica Usecase para aplicar design partten command
export interface Usecase<InputDto, OutputDto> {
  // Método que executa a lógica de negócio, recebendo um DTO de entrada e retornando um DTO de saída
  execute(input: InputDto): Promise<OutputDto>;
}

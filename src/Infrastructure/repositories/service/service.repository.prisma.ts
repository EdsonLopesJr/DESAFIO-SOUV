import { PrismaClient } from '@prisma/client';
import { Service } from '../../../domain/service/entities/service.entity';
import { ServiceGateway } from '../../../domain/service/gateway/service.gateway';

// Classe de repositório para a entidade Service usando o Prisma ORM
export class ServiceRepositoryPrisma implements ServiceGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new ServiceRepositoryPrisma(prismaClient);
  }

  // Método para salvar um novo serviço no banco de dados
  public async save(service: Service): Promise<void> {
    const data = {
      id: service.id,
      name: service.name,
      description: service.description,
      icon: service.icon
    };

    // Salva o serviço no banco de dados
    await this.prismaClient.service.create({ data });
  }

  // Método para listar todos os serviços
  public async list(): Promise<Service[]> {
    // Busca todos os serviços no banco de dados
    const services = await this.prismaClient.service.findMany();

    // Mapeia os serviços retornados para instâncias da entidade Service
    const serviceList = services.map((s) => {
      const service = Service.with({
        id: s.id,
        name: s.name,
        description: s.description,
        icon: s.icon
      });

      // Retorna a lista de serviços
      return service;
    });

    return serviceList;
  }

  // Método para encontrar um serviço por ID
  public async findById(id: string): Promise<Service | null> {
    // Busca um serviço no banco de dados pelo ID
    const service = await this.prismaClient.service.findFirst({
      where: { id }
    });

    // Se o serviço não for encontrado, retorna null Tratar futuramento retornado erro
    if (!service) {
      return null;
    }

    // Retorna uma instância da entidade Service com os dados encontrados
    return Service.with({
      id: service.id,
      name: service.name,
      description: service.description,
      icon: service.icon
    });
  }
}

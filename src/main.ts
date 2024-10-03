import { CreateServiceUsecase } from './application/service/create-service/create-service.usecase';
import { ListServiceUsecase } from './application/service/list-service/list-service.usecase';
import { ApiExpress } from './Infrastructure/api/express/api.express';
import { CreateServiceRoute } from './Infrastructure/api/express/routes/service/create-service.express.route';
import { ListServiceRoute } from './Infrastructure/api/express/routes/service/list-service.express.route';
import { ServiceRepositoryPrisma } from './Infrastructure/repositories/service/service.repository.prisma';
import { prisma } from './package/prisma/prisma';

function main() {
  const aRepository = ServiceRepositoryPrisma.create(prisma);

  // Services
  const createServiceUsecase = CreateServiceUsecase.create(aRepository);
  const listServiceUsecase = ListServiceUsecase.create(aRepository);

  // Cria as rotas para criar e listar serviços
  const createServiceRoute = CreateServiceRoute.create(createServiceUsecase);
  const listServiceRoute = ListServiceRoute.create(listServiceUsecase);

  // Cria a API passando as rotas criadas
  const port = 3333;
  const api = ApiExpress.create([createServiceRoute, listServiceRoute]);

  // Inicia o servidor na porta definida
  api.start(port);
}

main();

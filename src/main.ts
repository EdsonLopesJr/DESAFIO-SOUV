import { CreateCalendarUsecase } from './application/calendar/create-calendar/create-calendar.usecase';
import { ListCalendarUsecase } from './application/calendar/list-calendar/list-calendar.usecase';
import { CreateServiceUsecase } from './application/service/create-service/create-service.usecase';
import { ListServiceUsecase } from './application/service/list-service/list-service.usecase';
import { ApiExpress } from './Infrastructure/api/express/api.express';
import { CreateCalendarRoute } from './Infrastructure/api/express/routes/calendar/create-calendar.express.route';
import { ListCalendarRoute } from './Infrastructure/api/express/routes/calendar/list-calendar.express.route';
import { CreateServiceRoute } from './Infrastructure/api/express/routes/service/create-service.express.route';
import { ListServiceRoute } from './Infrastructure/api/express/routes/service/list-service.express.route';
import { CalendarRepositoryPrisma } from './Infrastructure/repositories/calendar/calendar.repository.prisma';
import { ServiceRepositoryPrisma } from './Infrastructure/repositories/service/service.repository.prisma';
import { prisma } from './package/prisma/prisma';

function main() {
  // Services
  const aServiceRepository = ServiceRepositoryPrisma.create(prisma);

  const createServiceUsecase = CreateServiceUsecase.create(aServiceRepository);
  const listServiceUsecase = ListServiceUsecase.create(aServiceRepository);

  // Cria as rotas para criar e listar serviços
  const createServiceRoute = CreateServiceRoute.create(createServiceUsecase);
  const listServiceRoute = ListServiceRoute.create(listServiceUsecase);

  // Calendars

  const aCalendarRepositoryPrisma = CalendarRepositoryPrisma.create(prisma);

  const createCalendarUsecase = CreateCalendarUsecase.create(aCalendarRepositoryPrisma, aServiceRepository);
  const listCalendarUsecase = ListCalendarUsecase.create(aCalendarRepositoryPrisma);

  // Cria as rotas para criar e listar Calendar
  const createCalendarRoute = CreateCalendarRoute.create(createCalendarUsecase);
  const listeCalendarRoute = ListCalendarRoute.create(listCalendarUsecase);

  // Cria a API passando as rotas criadas
  const port = 3333;
  const api = ApiExpress.create([createServiceRoute, listServiceRoute, createCalendarRoute, listeCalendarRoute]);

  // Inicia o servidor na porta definida
  api.start(port);
}

main();

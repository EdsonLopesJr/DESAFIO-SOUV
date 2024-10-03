import { Api } from '../api';
import express, { Express } from 'express';
import { Route } from './routes/route';

// Classe que implementa a interface Api usando Express
export class ApiExpress implements Api {
  private app: Express;

  private constructor(routes: Route[]) {
    this.app = express();
    this.app.use(express.json());
    this.addRoutes(routes);
  }

  public static create(routes: Route[]) {
    return new ApiExpress(routes);
  }

  // Método privado para adicionar rotas ao aplicativo Express
  private addRoutes(routes: Route[]) {
    routes.forEach((route) => {
      const path = route.getPath();
      const method = route.getMethod();
      const handler = route.getHandler();
      this.app[method](path, handler);
    });
  }

  // Método público para iniciar o servidor na porta especificada
  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server Running on port ${port}`);
      this.listRoutes();
    });
  }

  // Método privado para listar todas as rotas registradas no aplicativo
  private listRoutes() {
    const routes = this.app._router.stack
      .filter((r: any) => r.route)
      .map((r: any) => {
        return {
          path: r.route.path,
          method: r.route.stack[0].method
        };
      });

    console.log(routes);
  }
}

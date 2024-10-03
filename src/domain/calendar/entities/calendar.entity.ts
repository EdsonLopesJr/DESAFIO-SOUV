import { Service } from '../../service/entities/service.entity';
import { InvalidParamError } from '../../service/exceptions/invalid-params-error';

export type CalendarProps = {
  id: string;
  name: string;
  phone: string;
  services: Service[];
  timestamp: Date;
};

export class Calendar {
  private constructor(private props: CalendarProps) {}

  // Método para criar um calendário de agendamento
  public static create(name: string, phone: string, services: Service[], timestamp: Date) {
    const params = { name, phone, services, timestamp };

    // Verificação dos parâmetros
    for (const [key, value] of Object.entries(params)) {
      if (!value) {
        throw new InvalidParamError(key.charAt(0).toUpperCase() + key.slice(1));
      }
    }

    // Retorna uma nova instância de Calendar
    return new Calendar({
      id: crypto.randomUUID().toString(),
      name,
      phone,
      services,
      timestamp
    });
  }

  // Método estático para criar um serviço com propriedades já definidas
  public static with(props: CalendarProps) {
    return new Calendar(props);
  }

  // Métodos getter para acessar as propriedades do calendário
  public get id() {
    return this.props.id;
  }

  public get name() {
    return this.props.name;
  }

  public get phone() {
    return this.props.phone;
  }

  public get services() {
    return this.props.services;
  }

  public get timestamp() {
    return this.props.timestamp;
  }
}

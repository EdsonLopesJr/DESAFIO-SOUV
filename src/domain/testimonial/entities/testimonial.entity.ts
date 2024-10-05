import { InvalidParamError } from '../../service/exceptions/invalid-params-error';

export type TestimonialProps = {
  id: string;
  name: string;
  message: string;
  profile: string | undefined;
};

export class Testimonial {
  private constructor(private props: TestimonialProps) {}

  public static create(name: string, message: string, profile?: string) {
    const params = { name, message }; // Agrupa os parâmetros em um objeto

    // Verifica se cada parâmetro é válido
    for (const [key, value] of Object.entries(params)) {
      if (!value) {
        throw new InvalidParamError(key.charAt(0) + key.slice(1)); // Lança o erro se o parâmetro for inválido
      }
    }

    return new Testimonial({
      id: crypto.randomUUID().toString(),
      name,
      message,
      profile: profile ?? undefined
    });
  }

  public static with(props: TestimonialProps) {
    return new Testimonial(props);
  }

  public get id() {
    return this.props.id;
  }

  public get name() {
    return this.props.name;
  }

  public get message() {
    return this.props.message;
  }

  public get profile() {
    return this.props.profile;
  }
}

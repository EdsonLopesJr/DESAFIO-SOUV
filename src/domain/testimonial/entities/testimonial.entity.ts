export type TestimonialProps = {
  id: string;
  name: string;
  message: string;
};

export class Testimonial {
  private constructor(private props: TestimonialProps) {}

  public static create(name: string, message: string) {
    return new Testimonial({
      id: crypto.randomUUID().toString(),
      name,
      message
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
}

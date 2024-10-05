import { PrismaClient } from '@prisma/client';
import { TestimonialGateway } from '../../../domain/testimonial/gateway/testimonial.gateway';
import { Testimonial } from '../../../domain/testimonial/entities/testimonial.entity';

export class TestimonialRepositoryPrisma implements TestimonialGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new TestimonialRepositoryPrisma(prismaClient);
  }

  public async save(testimonial: Testimonial): Promise<void> {
    const data = {
      id: testimonial.id,
      name: testimonial.name,
      message: testimonial.message,
      profile: testimonial.profile
    };

    await this.prismaClient.testimonial.create({ data });
  }

  public async list(): Promise<Testimonial[]> {
    const testimonials = await this.prismaClient.testimonial.findMany();

    const testimonialList = testimonials.map((t) => {
      const testimonial = Testimonial.with({
        id: t.id,
        name: t.name,
        message: t.message,
        profile: t.profile ?? undefined
      });

      return testimonial;
    });

    return testimonialList;
  }
}

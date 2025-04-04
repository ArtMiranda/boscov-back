import { PrismaClient, review as PrismaReview } from "@prisma/client";
import { CreateReviewDTO } from "../../../application/dtos/review/in/create-review.dto";
import { IReviewRepository } from "../../../infrastructure/repositories/review/review-repository.interface";
import { Review } from "../../entities/review/review.entity";

const prisma = new PrismaClient();

export class ReviewRepository implements IReviewRepository {
  private constructor() {}
  private static instance: ReviewRepository;
  static getInstance(): ReviewRepository {
    if (!ReviewRepository.instance) {
      ReviewRepository.instance = new ReviewRepository();
    }
    return ReviewRepository.instance;
  }

  toEntity(prismaReview: PrismaReview): Review {
    return new Review(
      prismaReview.id,
      prismaReview.movieId,
      prismaReview.title,
      prismaReview.body,
      prismaReview.rating,
      prismaReview.active,
      prismaReview.authorId,
      prismaReview.createdAt,
      prismaReview.updatedAt
    );
  }

  toPrismaEntity(review: Review): PrismaReview {
    return {
      id: review.id,
      movieId: review.movieId,
      title: review.title,
      body: review.body,
      rating: review.rating,
      active: review.active,
      authorId: review.authorId,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    };
  }

  async createReview(dto: CreateReviewDTO): Promise<Review> {
    const review = await prisma.review.create({
      data: {
        movieId: dto.movieId,
        title: dto.title,
        body: dto.body,
        rating: dto.rating,
        authorId: dto.authorId,
      },
    });

    return this.toEntity(review);
  }

  async updateReview(id: string, dto: CreateReviewDTO): Promise<Review> {
    const review = await prisma.review.update({
      where: { id: id },
      data: {
        title: dto.title,
        body: dto.body,
        rating: dto.rating,
      },
    });

    return this.toEntity(review);
  }
}

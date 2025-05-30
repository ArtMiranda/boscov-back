import { PrismaClient, review as PrismaReview, Role } from "@prisma/client";
import { CreateReviewDTO } from "../../../application/dtos/review/in/create-review.dto";
import { IReviewRepository } from "../../../infrastructure/repositories/review/review-repository.interface";
import { Review } from "../../entities/review/review.entity";
import { User } from "../../entities/user/user.entity";

const prisma = new PrismaClient();

type PrismaReviewWithAuthor = PrismaReview & {
  author: {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    active: boolean;
    role: string; 
  };
};

export class ReviewRepository implements IReviewRepository {
  private constructor() {}
  private static instance: ReviewRepository;
  static getInstance(): ReviewRepository {
    if (!ReviewRepository.instance) {
      ReviewRepository.instance = new ReviewRepository();
    }
    return ReviewRepository.instance;
  }

  toEntity(prismaReview: PrismaReviewWithAuthor): Review {
    const authorEntity = new User({
      id: prismaReview.author.id,
      email: prismaReview.author.email,
      username: prismaReview.author.username,
      firstName: prismaReview.author.firstName,
      lastName: prismaReview.author.lastName,
      password: prismaReview.author.password,
      createdAt: prismaReview.author.createdAt,
      updatedAt: prismaReview.author.updatedAt,
      active: prismaReview.author.active,
      role: prismaReview.author.role as Role,
    });

    return new Review(
      prismaReview.id,
      prismaReview.movieId,
      prismaReview.title,
      prismaReview.body,
      prismaReview.rating,
      prismaReview.active,
      authorEntity,
      prismaReview.createdAt,
      prismaReview.updatedAt,
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
      authorId: review.author.id!,
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

    return this.toEntity({
      ...review,
      author: await prisma.user.findUniqueOrThrow({ where: { id: dto.authorId } }),
    });
  }

  async updateReview(id: string, dto: CreateReviewDTO): Promise<Review> {
    const review = await prisma.review.update({
      where: { id },
      data: {
        title: dto.title,
        body: dto.body,
        rating: dto.rating,
      },
      include: {
        author: true,
      },
    });

    return this.toEntity(review);
  }

  async deactivateReview(id: string): Promise<Review> {
    const review = await prisma.review.update({
      where: { id },
      data: {
        active: false,
      },
      include: {
        author: true,
      },
    });

    return this.toEntity(review);
  }

  async existsById(id: string): Promise<boolean> {
    const review = await prisma.review.findUnique({
      where: { id },
    });

    return review !== null;
  }

  async getReviewsByMovieId(movieId: number): Promise<Review[]> {
    const reviews = await prisma.review.findMany({
      where: { movieId },
      include: {
        author: true,
      },
    });

    return reviews.map((review) => this.toEntity(review));
  }
}

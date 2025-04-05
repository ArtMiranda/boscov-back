import { Review } from "../../../domain/entities/review/review.entity";
import { ReviewNotFoundError } from "../../../domain/errors/review/review.errors";
import { ReviewRepository } from "../../../domain/repositories/review/review.repository";
import { IReviewRepository } from "../../../infrastructure/repositories/review/review-repository.interface";

export class DeactivateReviewUseCase {
  private constructor(private readonly reviewRepository: IReviewRepository) {}

  static makeUseCase() {
    return new DeactivateReviewUseCase(ReviewRepository.getInstance());
  }

  async execute(id: string): Promise<Review> {
    const existsById = await this.reviewRepository.existsById(id);

    if (!existsById) {
      throw new ReviewNotFoundError();
    }

    const review = await this.reviewRepository.deactivateReview(id);
    return review;
  }
}

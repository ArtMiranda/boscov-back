import { ReviewRepository } from "../../../domain/repositories/review/review.repository";
import { IReviewRepository } from "../../../infrastructure/repositories/review/review-repository.interface";

export class GetReviewsByMovieIdUseCase {
  private constructor(private readonly reviewRepository: IReviewRepository) {}

  static makeUseCase() {
    return new GetReviewsByMovieIdUseCase(ReviewRepository.getInstance());
  }

  async execute(movieId: number) {
    const reviews = await this.reviewRepository.getReviewsByMovieId(movieId);
    return reviews;
  }
}

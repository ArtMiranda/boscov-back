import { ReviewRepository } from "../../../domain/repositories/review/review.repository";
import { IReviewRepository } from "../../../infrastructure/repositories/review/review-repository.interface";
import { UpdateReviewDTO } from "../../dtos/review/in/update-review.dto";

export class UpdateReviewUseCase {
  private constructor(private reviewRepository: IReviewRepository) {}

  static makeUseCase() {
    return new UpdateReviewUseCase(ReviewRepository.getInstance());
  }

  async execute(id: string, dto: UpdateReviewDTO) {
    const updatedReview = await this.reviewRepository.updateReview(id, dto);
    return updatedReview;
  }
}

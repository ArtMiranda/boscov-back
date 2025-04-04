import { CreateReviewDTO } from "../../../application/dtos/review/in/create-review.dto";
import { UpdateReviewDTO } from "../../../application/dtos/review/in/update-review.dto";
import { Review } from "../../../domain/entities/review/review.entity";

export interface IReviewRepository {
  createReview(dto: CreateReviewDTO): Promise<Review>;
  updateReview(id: string, dto: UpdateReviewDTO): Promise<Review>;
}

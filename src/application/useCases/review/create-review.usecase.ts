import { UserNotFoundError } from "../../../domain/errors/user/user.errors";
import { ReviewRepository } from "../../../domain/repositories/review/review.repository";
import { UserRepository } from "../../../domain/repositories/user/user.repository";
import { IReviewRepository } from "../../../infrastructure/repositories/review/review-repository.interface";
import { IUserRepository } from "../../../infrastructure/repositories/user/user-repository.interface";
import { CreateReviewDTO } from "../../dtos/review/in/create-review.dto";

export class CreateReviewUseCase {
  private constructor(
    private readonly reviewRepository: IReviewRepository,
    private userRepository: IUserRepository
  ) {}

  static makeUseCase() {
    return new CreateReviewUseCase(
      ReviewRepository.getInstance(),
      UserRepository.getInstance()
    );
  }

  async execute(dto: CreateReviewDTO) {
    const userExists = await this.userRepository.existsById(dto.authorId);
    if (!userExists) {
      throw new UserNotFoundError(`User with id ${dto.authorId} not found`);
    }

    const newReview = await this.reviewRepository.createReview(dto);

    return newReview;
  }
}

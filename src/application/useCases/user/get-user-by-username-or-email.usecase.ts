import { User } from "../../../domain/entities/user/user.entity";
import { UserNotFoundError } from "../../../domain/errors/user/user.errors";
import { UserRepository } from "../../../domain/repositories/user/user.repository";
import { IUserRepository } from "../../../infrastructure/repositories/user/user-repository.interface";

export class GetUserByUsernameOrEmailUseCase {
  private constructor(private readonly userRepository: IUserRepository) {}

  static makeUseCase() {
    const userRepository = UserRepository.getInstance();
    return new GetUserByUsernameOrEmailUseCase(userRepository);
  }

  async execute(username: string): Promise<User | null> {
    const user = await this.userRepository.findByUsernameOrEmail(username);
    if (!user) {
      throw new UserNotFoundError(`User with username ${username} not found`);
    }
    return user;
  }
}

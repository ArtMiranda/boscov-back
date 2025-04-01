import {
  UserAlreadyDeactivatedError,
  UserNotFoundError,
} from "../../../domain/errors/user/User.errors";
import { UserRepository } from "../../../domain/repositories/user/User.repository";
import { IUserRepository } from "../../../infrastructure/repositories/user/IUserRepository.interface";

export class DeactivateUserByUsernameUsecase {
  constructor(private userRepository: IUserRepository) {}

  static makeUseCase() {
    const userRepository = UserRepository.getInstance();
    return new DeactivateUserByUsernameUsecase(userRepository);
  }

  async execute(username: string): Promise<void> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new UserNotFoundError(`User with username ${username} not found`);
    }
    if (!user.active) {
      throw new UserAlreadyDeactivatedError();
    }

    await this.userRepository.deactivateUserByUsername(username);
  }
}

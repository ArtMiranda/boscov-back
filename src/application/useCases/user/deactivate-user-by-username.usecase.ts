import {
  UserAlreadyDeactivatedError,
  UserNotFoundError,
} from "../../../domain/errors/user/user.errors";
import { UserRepository } from "../../../domain/repositories/user/user.repository";
import { IUserRepository } from "../../../infrastructure/repositories/user/user-repository.interface";

export class DeactivateUserByUsernameUsecase {
  constructor(private userRepository: IUserRepository) {}

  static makeUseCase() {
    const userRepository = UserRepository.getInstance();
    return new DeactivateUserByUsernameUsecase(userRepository);
  }

  async execute(username: string) {
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

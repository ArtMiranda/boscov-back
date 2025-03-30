import {
    UserAlreadyDeactivatedError,
    UserNotFoundError,
} from "../../domain/errors/User.errors";
import { UserRepository } from "../../domain/repositories/User.repository";
import { IUserRepository } from "../../infrastructure/repositories/IUserRepository.interface";

export class DeactivateUserByUsernameUsecase {
  constructor(private userRepository: IUserRepository) {}

  private static instace: DeactivateUserByUsernameUsecase;

  static getInstance(): DeactivateUserByUsernameUsecase {
    if (!this.instace) {
      this.instace = new DeactivateUserByUsernameUsecase(
        UserRepository.getInstance()
      );
      return this.instace;
    }
    return this.instace;
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

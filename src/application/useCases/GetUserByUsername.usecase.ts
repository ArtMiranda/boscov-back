import { User } from "../../domain/entities/User.entity";
import { UserNotFoundError } from "../../domain/errors/User.errors";
import { UserRepository } from "../../domain/repositories/User.repository";
import { IUserRepository } from "../../infrastructure/repositories/IUserRepository.interface";

export class GetUserByUsernameUsecase {
  private constructor(private readonly userRepository: IUserRepository) {}

  private static instance: GetUserByUsernameUsecase;

  static getInstance(): GetUserByUsernameUsecase {
    if (!this.instance) {
      this.instance = new GetUserByUsernameUsecase(
        UserRepository.getInstance()
      );
    }
    return this.instance;
  }

  async execute(username: string): Promise<User | null> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new UserNotFoundError(`User with username ${username} not found`);
    }
    return user;
  }
}

import { compare, hash } from "bcrypt";
import { InvalidCredentialsError } from "../../../domain/errors/auth/auth.errors";
import { UserNotFoundError } from "../../../domain/errors/user/user.errors";
import { UserRepository } from "../../../domain/repositories/user/user.repository";
import { IUserRepository } from "../../../infrastructure/repositories/user/user-repository.interface";
import { ChangePasswordDTO } from "../../dtos/auth/change-password.dto";

export class ChangePasswordUseCase {
  private constructor(private readonly userRepository: IUserRepository) {}

  static makeUseCase() {
    return new ChangePasswordUseCase(UserRepository.getInstance());
  }

  async execute(dto: ChangePasswordDTO) {
    const user = await this.userRepository.findByUsername(dto.username);
    if (!user) {
      throw new UserNotFoundError(
        `User with username "${dto.username}" not found.`
      );
    }

    const isPasswordValid = await compare(dto.currentPassword, user.password);

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    const hashedPassword = await hash(dto.newPassword, 10);

    user.password = hashedPassword;
    await this.userRepository.update(user);
  }
}

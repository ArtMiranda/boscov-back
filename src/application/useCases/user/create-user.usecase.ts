import { User } from "../../../domain/entities/user/user.entity";
import { UserAlreadyExistsError } from "../../../domain/errors/user/user.errors";
import { UserRepository } from "../../../domain/repositories/user/user.repository";
import { IUserRepository } from "../../../infrastructure/repositories/user/user-repository.interface";
import { CreateUserDTO } from "../../dtos/user/create-user.dto";

export class CreateUserUseCase {
  private constructor(private readonly userRepository: IUserRepository) {}

  static makeUseCase(): CreateUserUseCase {
    return new CreateUserUseCase(UserRepository.getInstance());
  }

  async execute(dto: CreateUserDTO): Promise<User> {
    const userExistsByEmail = await this.userRepository.findByEmail(dto.email);

    if (userExistsByEmail) {
      throw new UserAlreadyExistsError();
    }
    const userExistsByUsername = await this.userRepository.findByUsername(
      dto.username
    );

    if (userExistsByUsername) {
      throw new UserAlreadyExistsError();
    }

    const userEntity = new User({
      email: dto.email,
      username: dto.username,
      firstName: dto.firstName,
      lastName: dto.lastName,
      password: dto.password,
      role: dto.role,
    });

    const newUser = await this.userRepository.create(userEntity);
    return newUser;
  }
}

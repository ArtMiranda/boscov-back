import { User } from "../../domain/entities/User.entity";
import { UserAlreadyExistsError } from "../../domain/errors/User.errors";
import { UserRepository } from "../../domain/repositories/User.repository";
import { IUserRepository } from "../../infrastructure/repositories/IUserRepository.interface";
import { CreateUserDTO } from "../dtos/CreateUser.dto";

export class CreateUserUseCase {
  private constructor(private readonly userRepository: IUserRepository) {}

  private static instance: CreateUserUseCase;

  static getInstance(): CreateUserUseCase {
    if (!this.instance) {
      this.instance = new CreateUserUseCase(UserRepository.getInstance());
    }
    return this.instance;
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

import { User } from "../../../domain/entities/user/User.entity";

export interface IUserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByUsernameOrEmail(usernameOrEmail: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  deactivateUserByUsername(username: string): Promise<void>;
}

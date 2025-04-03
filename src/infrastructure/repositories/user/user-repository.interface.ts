import { User } from "../../../domain/entities/user/user.entity";

export interface IUserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByUsernameOrEmail(usernameOrEmail: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  deactivateUserByUsername(username: string): Promise<void>;
  update(user: User): Promise<User>;
}

import { PrismaClient, user as PrismaUser, Role } from "@prisma/client";
import { IUserRepository } from "../../../infrastructure/repositories/user/user-repository.interface";
import { User } from "../../entities/user/user.entity";

const prisma = new PrismaClient();

export class UserRepository implements IUserRepository {
  private constructor() {}

  private static instance: UserRepository;

  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }

  private toDomainEntity(prismaUser: PrismaUser): User {
    return new User({
      id: prismaUser.id,
      email: prismaUser.email,
      username: prismaUser.username,
      firstName: prismaUser.firstName,
      lastName: prismaUser.lastName,
      password: prismaUser.password,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
      active: prismaUser.active,
      role: prismaUser.role as Role,
    });
  }

  private toPrismaEntity(user: User): PrismaUser {
    return {
      id: user.id!,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      active: user.active,
      role: user.role,
    };
  }

  async create(user: User): Promise<User> {
    const userObject = this.toPrismaEntity(user);

    const createdUser = await prisma.user.create({
      data: userObject,
    });

    return this.toDomainEntity(createdUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user ? this.toDomainEntity(user) : null;
  }

  async findByUsernameOrEmail(usernameOrEmail: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
    });

    return user ? this.toDomainEntity(user) : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    return user ? this.toDomainEntity(user) : null;
  }

  async deactivateUserByUsername(username: string): Promise<void> {
    await prisma.user.update({
      where: { username },
      data: { active: false },
    });
  }

  async update(user: User): Promise<User> {
    const userObject = this.toPrismaEntity(user);

    const updatedUser = await prisma.user.update({
      where: { id: userObject.id },
      data: userObject,
    });

    return this.toDomainEntity(updatedUser);
  }

  async existsById(id: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user !== null;
  }
}

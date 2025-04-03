import { Role } from "@prisma/client";
import { User } from "../../../domain/entities/user/user.entity";

export class UserResponseDTO {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  role: Role;

  constructor(
    id: string,
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    createdAt: Date,
    role: Role
  ) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.createdAt = createdAt;
    this.role = role;
  }

  static toDTO(user: User): UserResponseDTO {
    return new UserResponseDTO(
      user.id!,
      user.email,
      user.username,
      user.firstName,
      user.lastName,
      user.createdAt,
      user.role
    );
  }
}

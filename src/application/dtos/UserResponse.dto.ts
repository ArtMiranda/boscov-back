import { Role } from "@prisma/client";

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
}
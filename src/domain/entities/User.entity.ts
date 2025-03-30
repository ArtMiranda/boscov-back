import { Role } from "@prisma/client";

export class User {
  id?: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  role: Role;

  constructor(props: {
    id?: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    active?: boolean;
    role?: Role;
  }) {
    this.id = props.id;
    this.email = props.email;
    this.username = props.username;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.password = props.password;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
    this.active = props.active !== undefined ? props.active : true;
    this.role = props.role || Role.USER;
  }


}

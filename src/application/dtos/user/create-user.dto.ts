import { Role } from "@prisma/client";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from "class-validator";

export class CreateUserDTO {
  @IsEmail(
    {},
    {
      message: "Email inválido",
    }
  )
  email: string;

  @IsNotEmpty({ message: "Nome de usuário é obrigatório" })
  @MinLength(3, { message: "Nome de usuário deve ter pelo menos 3 caracteres" })
  username: string;

  @IsNotEmpty({ message: "Nome é obrigatório" })
  @MinLength(3, { message: "Nome deve ter pelo menos 3 caracteres" })
  firstName: string;

  @IsNotEmpty({ message: "Sobrenome é obrigatório" })
  @MinLength(3, { message: "Sobrenome deve ter pelo menos 3 caracteres" })
  lastName: string;

  @MinLength(6, {
    message: "Senha deve ter pelo menos 6 caracteres",
  })
  password: string;

  @IsEnum(Role)
  @IsOptional({ message: "Permissão deve ser um dos valores definidos" })
  role?: Role;

  constructor(
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    role?: Role
  ) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.role = role || Role.USER;
  }
}

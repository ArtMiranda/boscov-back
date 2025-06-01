import { Role } from "@prisma/client";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Matches,
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

  @MinLength(8, { message: "A senha deve ter no mínimo 8 caracteres." })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message:
      "A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial.",
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

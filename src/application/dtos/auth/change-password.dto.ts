import { IsString, MinLength } from "class-validator";

export class ChangePasswordDTO {
  @IsString()
  username: string;

  @IsString()
  currentPassword: string;

  @IsString()
  @MinLength(6, {
    message: "A nova senha deve ter ao mínimo 6 caracteres",
  })
  newPassword: string;

  constructor(username: string, currentPassword: string, newPassword: string) {
    this.username = username;
    this.currentPassword = currentPassword;
    this.newPassword = newPassword;
  }
}

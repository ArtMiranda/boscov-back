import { AppError } from "../App.error";

export class InvalidCredentialsError extends AppError {
  constructor() {
    super("Invalid credentials", 401);
  }
}
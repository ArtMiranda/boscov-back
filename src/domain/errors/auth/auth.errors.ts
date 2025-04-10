import { StatusCodes } from "http-status-codes";
import { AppError } from "../app.error";

export class InvalidCredentialsError extends AppError {
  constructor() {
    super("Invalid credentials", StatusCodes.UNAUTHORIZED);
  }
}
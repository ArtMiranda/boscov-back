import { AppError } from "../app.error";

export class UserAlreadyExistsError extends AppError {
  constructor() {
    super("User with this email already exists", 409);
  }
}

export class InvalidPasswordError extends AppError {
  constructor() {
    super("Password must have at least 8 characters", 400);
  }
}

export class UserNotFoundError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export class UserAlreadyDeactivatedError extends AppError {
  constructor() {
    super("User already deactivated", 400);
  }
}

export class UserNotActiveError extends AppError {
  constructor() {
    super("User is not active", StatusCodes.FORBIDDEN);
  }
}
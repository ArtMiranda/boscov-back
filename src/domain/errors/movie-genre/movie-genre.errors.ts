import { AppError } from "../app.error";

export class GenreAlreadyExistsError extends AppError {
  constructor() {
    super("Genre already exists", 409);
  }
}

export class GenreNotFoundError extends AppError {
  constructor() {
    super("Genre not found", 404);
  }
}

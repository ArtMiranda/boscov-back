import { AppError } from "../app.error";

export class ReviewNotFoundError extends AppError {
  constructor() {
    super("Review not found", 404);
    this.name = "ReviewNotFoundError";
  }
}

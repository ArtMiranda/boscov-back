import { StatusCodes } from "http-status-codes";
import { AppError } from "../app.error";

export class ReviewNotFoundError extends AppError {
  constructor() {
    super("Review not found", StatusCodes.NOT_FOUND);
    this.name = "ReviewNotFoundError";
  }
}

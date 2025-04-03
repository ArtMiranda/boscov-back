import { NextFunction, Request, Response } from "express";
import { AppError } from "../../domain/errors/app.error";

function errorMiddleware(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error(err.stack);
  if (err) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default errorMiddleware;

import { NextFunction, Request, Response } from "express";

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error(err.stack);
  if (err instanceof Error && "statusCode" in err) {
    res.status((err as any).statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default errorHandler;

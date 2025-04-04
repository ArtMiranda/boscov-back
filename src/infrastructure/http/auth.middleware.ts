import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const JWT_SECRET = process.env.JWT_SECRET!;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token not provided or invalid format" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}

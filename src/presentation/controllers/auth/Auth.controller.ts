import { NextFunction, Request, Response } from "express";
import { LoginUseCase } from "../../../application/useCases/auth/Login.usecase";

export class AuthController {
  private constructor(private readonly loginUseCase: LoginUseCase) {}

  public static makeController() {
    return new AuthController(LoginUseCase.makeUseCase());
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { username, password } = req.body;

      const token = await this.loginUseCase.execute(username, password);

      res.status(200).json({
        token: token,
      });
    } catch (error) {
      next(error);
    }
  }
}

import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { ChangePasswordDTO } from "../../../application/dtos/auth/change-password.dto";
import { LoginCredentialsDTO } from "../../../application/dtos/auth/login-credentials.dto";
import { ChangePasswordUseCase } from "../../../application/useCases/auth/change-password-usecase";
import { LoginUseCase } from "../../../application/useCases/auth/login.usecase";

export class AuthController {
  private constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly changePasswordUseCase: ChangePasswordUseCase
  ) {}

  public static makeController() {
    return new AuthController(
      LoginUseCase.makeUseCase(),
      ChangePasswordUseCase.makeUseCase()
    );
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const dto: LoginCredentialsDTO = req.body;

      const errors = await validate(dto);

      if (errors.length > 0) {
        res.status(400).json({
          message: "Validation failed",
          clientMessage: "Erro de validação",
          errors: errors,
        });
        return;
      }
      const token = await this.loginUseCase.execute(dto.username, dto.password);

      res.status(200).json({
        token: token,
      });
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const dto: ChangePasswordDTO = req.body;

      await this.changePasswordUseCase.execute(dto);

      const errors = await validate(dto);

      if (errors.length > 0) {
        res.status(400).json({
          message: "Validation failed",
          clientMessage: "Erro de validação",
          errors: errors,
        });
        return;
      }

      res.status(200).json({
        message: "Password changed successfully",
        clientMessage: "Senha alterada com sucesso",
      });
    } catch (error) {
      next(error);
    }
  }
}

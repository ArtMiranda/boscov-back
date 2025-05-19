import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ChangePasswordDTO } from "../../../application/dtos/auth/change-password.dto";
import { LoginCredentialsDTO } from "../../../application/dtos/auth/login-credentials.dto";
import { ChangePasswordUseCase } from "../../../application/useCases/auth/change-password.usecase";
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
      const dto = plainToInstance(
        LoginCredentialsDTO,
        req.body as LoginCredentialsDTO
      );

      const errors = await validate(dto);

      if (errors.length > 0) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "Validation failed",
          clientMessage: "Erro de validação",
          errors: errors,
        });
        return;
      }
      const response = await this.loginUseCase.execute(dto.username, dto.password);

      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = plainToInstance(
        ChangePasswordDTO,
        req.body as ChangePasswordDTO
      );

      const errors = await validate(dto);

      if (errors.length > 0) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "Validation failed",
          clientMessage: "Erro de validação",
          errors: errors,
        });
        return;
      }

      await this.changePasswordUseCase.execute(dto);

      res.status(StatusCodes.OK).json({
        message: "Password changed successfully",
        clientMessage: "Senha alterada com sucesso",
      });
    } catch (error) {
      next(error);
    }
  }
}

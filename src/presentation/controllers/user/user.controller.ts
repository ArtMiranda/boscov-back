import { hash } from "bcrypt";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { CreateUserDTO } from "../../../application/dtos/user/create-user.dto";
import { UserResponseDTO } from "../../../application/dtos/user/user-response.dto";
import { CreateUserUseCase } from "../../../application/useCases/user/create-user.usecase";
import { DeactivateUserByUsernameUsecase } from "../../../application/useCases/user/deactivate-user-by-username.usecase";
import { GetUserByUsernameOrEmailUseCase } from "../../../application/useCases/user/get-user-by-username-or-email";

export class UserController {
  private constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByUsernameOrEmailUseCase: GetUserByUsernameOrEmailUseCase,
    private readonly deactivateUserByUsernameUsecase: DeactivateUserByUsernameUsecase
  ) {}

  public static makeController(): UserController {
    return new UserController(
      CreateUserUseCase.makeUseCase(),
      GetUserByUsernameOrEmailUseCase.makeUseCase(),
      DeactivateUserByUsernameUsecase.makeUseCase()
    );
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto: CreateUserDTO = req.body;

      const errors = await validate(dto);

      if (errors.length > 0) {
        res.status(400).json({
          message: "Validation failed",
          clientMessage: "Erro de validação",
          errors: errors,
        });
        return;
      }

      const hashedPassword = await hash(dto.password, 10);
      dto.password = hashedPassword;

      const newUser = await this.createUserUseCase.execute(dto);

      const userResponse = UserResponseDTO.toDTO(newUser);

      res.status(201).json(userResponse);
    } catch (error) {
      next(error);
    }
  }

  async getUserByUsername(req: Request, res: Response, next: NextFunction) {
    try {
      const username = req.params.username;

      if (!username) {
        res.status(400).json({
          message: "Username is required",
          clientMessage: "Nome de usuário é obrigatório",
        });
        return;
      }

      const user = await this.getUserByUsernameOrEmailUseCase.execute(username);

      if (!user) {
        res.status(404).json({
          message: "User not found",
          clientMessage: "Usuário não encontrado",
        });
        return;
      }

      const userResponse = UserResponseDTO.toDTO(user);

      res.status(200).json(userResponse);
    } catch (error) {
      next(error);
    }
  }

  async deactivateUserByUsername(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const username = req.params.username;

      if (!username) {
        res.status(400).json({
          message: "Username is required",
          clientMessage: "Nome de usuário é obrigatório",
        });
        return;
      }

      await this.deactivateUserByUsernameUsecase.execute(username);

      res.status(200).json({
        message: "User deactivated successfully",
        clientMessage: "Usuário desativado com sucesso",
      });
    } catch (error) {
      next(error);
    }
  }
}

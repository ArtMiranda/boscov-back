import { hash } from "bcrypt";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { CreateUserDTO } from "../../../application/dtos/user/CreateUser.dto";
import { UserResponseDTO } from "../../../application/dtos/user/UserResponse.dto";
import { CreateUserUseCase } from "../../../application/useCases/user/CreateUser.usecase";
import { DeactivateUserByUsernameUsecase } from "../../../application/useCases/user/DeactivateUserByUsername.usecase";
import { GetUserByUsernameOrEmailUseCase } from "../../../application/useCases/user/GetUserByUsernameOrEmail";

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

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, username, firstName, lastName, password, role } = req.body;

      const hashedPassword = await hash(password, 10);

      const dto = new CreateUserDTO(
        email,
        username,
        firstName,
        lastName,
        hashedPassword,
        role
      );
      const errors = await validate(dto);

      if (errors.length > 0) {
        res.status(400).json({
          status: "error",
          message: "Validation failed",
          clientMessage: "Erro de validação",
          errors: errors.map((e) => e.constraints),
        });
        return;
      }

      const newUser = await this.createUserUseCase.execute(dto);

      const userResponse = new UserResponseDTO(
        newUser.id!,
        newUser.email,
        newUser.username,
        newUser.firstName,
        newUser.lastName,
        newUser.createdAt,
        newUser.role
      );

      res.status(201).json(userResponse);
    } catch (error) {
      next(error);
    }
  }

  async getUserByUsername(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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

      const userResponse = new UserResponseDTO(
        user.id!,
        user.email,
        user.username,
        user.firstName,
        user.lastName,
        user.createdAt,
        user.role
      );

      res.status(200).json(userResponse);
    } catch (error) {
      next(error);
    }
  }

  async deactivateUserByUsername(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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

      res.status(200).json({ message: "User deactivated successfully" });
    } catch (error) {
      next(error);
    }
  }
}

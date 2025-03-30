import { hash } from "bcrypt";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { CreateUserDTO } from "../../application/dtos/CreateUser.dto";
import { UserResponseDTO } from "../../application/dtos/UserResponse.dto";
import { CreateUserUseCase } from "../../application/useCases/CreateUser.usecase";
import { DeactivateUserByUsernameUsecase } from "../../application/useCases/DeactivateUserByUsername.usecase";
import { GetUserByUsernameUsecase } from "../../application/useCases/GetUserByUsername.usecase";

export class UserController {
  private constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByUsernameUsecase: GetUserByUsernameUsecase,
    private readonly deactivateUserByUsernameUsecase: DeactivateUserByUsernameUsecase
  ) {}

  private static instance: UserController;

  public static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController(
        CreateUserUseCase.getInstance(),
        GetUserByUsernameUsecase.getInstance(),
        DeactivateUserByUsernameUsecase.getInstance()
      );
    }
    return UserController.instance;
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
        res.status(400).json({ message: "Username is required" });
        return;
      }

      const user = await this.getUserByUsernameUsecase.execute(username);

      if (!user) {
        res.status(404).json({ message: "User not found" });
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
        res.status(400).json({ message: "Username is required" });
        return;
      }

      await this.deactivateUserByUsernameUsecase.execute(username);

      res.status(200).json({ message: "User deactivated successfully" });
    } catch (error) {
      next(error);
    }
  }
}

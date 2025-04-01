import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { InvalidCredentialsError } from "../../../domain/errors/auth/Auth.errors";
import { UserNotActiveError } from "../../../domain/errors/user/User.errors";
import { GetUserByUsernameOrEmailUseCase } from "../user/GetUserByUsernameOrEmail";

export class LoginUseCase {
  private constructor(
    private readonly getUserByUsernameOrEmailUseCase: GetUserByUsernameOrEmailUseCase
  ) {}

  static makeUseCase(): LoginUseCase {
    return new LoginUseCase(GetUserByUsernameOrEmailUseCase.makeUseCase());
  }

  async execute(username: string, password: string): Promise<string> {
    const user = await this.getUserByUsernameOrEmailUseCase.execute(username);

    if (user?.active === false) {
      throw new UserNotActiveError();
    }

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return token;
  }
}

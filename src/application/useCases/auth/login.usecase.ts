import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { InvalidCredentialsError } from "../../../domain/errors/auth/auth.errors";
import { UserNotActiveError } from "../../../domain/errors/user/user.errors";
import { GetUserByUsernameOrEmailUseCase } from "../user/get-user-by-username-or-email";

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

    const token = jwt.sign(
      { id: user.id, sub: user.email },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      }
    );

    return token;
  }
}

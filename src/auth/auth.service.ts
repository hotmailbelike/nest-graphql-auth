import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/login-user-input';
import { SignupUserInput } from './dto/signup-user-input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  secureUser(user: User & { password?: string }): User {
    const { password, ...result } = user;
    return result;
  }

  async signup(signupUserInput: SignupUserInput) {
    //check if user already exists
    const user = this.usersService.findOneByEmail(signupUserInput.email);

    if (user) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(signupUserInput.password, 10);

    return this.usersService.create({
      ...signupUserInput,
      password: hashedPassword,
    });
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = this.usersService.findOneByEmail(email);

    const doPasswordsMatch = await bcrypt.compare(password, user.password);

    if (user && doPasswordsMatch) {
      //@ts-ignore
      return this.secureUser(user);
    }

    return null;
  }

  login(user: User) {
    return {
      accessToken: this.jwtService.sign({ user, sub: user.id }),
      user,
    };
  }
}

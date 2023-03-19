import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user-input';
import { SignupResponse } from './dto/signup-response';
import { SignupUserInput } from './dto/signup-user-input';
import { GqlAuthGuard } from './gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('logInUserInput') logInUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }

  @Mutation(() => SignupResponse)
  signup(@Args('signUpUserInput') signUpUserInput: SignupUserInput) {
    return this.authService.signup(signUpUserInput);
  }
}

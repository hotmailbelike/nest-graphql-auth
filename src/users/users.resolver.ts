import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'listUsers' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => [User], { name: 'listUsersSecure' })
  @UseGuards(JwtAuthGuard)
  findAllSecure() {
    return this.usersService.findAllSecure();
  }

  @Query(() => User, { name: 'findOneUserByEmail' })
  findOneByEmail(@Args('email', { type: () => String }) email: string) {
    return this.usersService.findOneByEmail(email);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  //create a mock users array with passwords
  private users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: 'johnPassword',
    },
    {
      id: 2,
      name: 'Jane smith',
      email: 'jane.smith@gmail.com',
      password: 'janePassword',
    },
  ];

  create(createUserInput: CreateUserInput) {
    const newUser = {
      id: this.users.length + 1,
      name: createUserInput.name,
      password: createUserInput.password,
      email: createUserInput.email,
    };
    this.users.push(newUser);
    console.log(
      '🚀 -> file: users.service.ts:32 -> UsersService -> create -> newUser:',
      newUser,
    );

    return newUser;
  }

  findAll() {
    return this.users;
  }

  findAllSecure() {
    return this.users;
  }

  findOneByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }
}

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
  @Field()
  password: string;

  @Field()
  email: string;
}

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignupUserInput {
  @Field()
  password: string;

  @Field()
  email: string;

  @Field()
  name: string;
}

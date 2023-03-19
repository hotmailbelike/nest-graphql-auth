import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  password: string;

  @Field()
  name: string;

  @Field()
  email: string;
}

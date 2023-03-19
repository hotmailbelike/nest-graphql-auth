import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignupResponse {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field(() => Int)
  id: number;
}

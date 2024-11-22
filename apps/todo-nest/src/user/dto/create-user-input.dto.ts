import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInputDto {
  @Field({ nullable: false })
  username: string;
}

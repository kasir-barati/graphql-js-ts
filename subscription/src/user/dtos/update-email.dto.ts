import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateEmailDto {
  @Field()
  email: string;
}

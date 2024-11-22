import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTodoInputDto {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => ID, { nullable: true })
  assignedToId: string;

  @Field(() => ID)
  createdById: string;
}

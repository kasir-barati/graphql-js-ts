import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/models/user.model';

@ObjectType()
export class Todo {
  @Field(() => ID, { nullable: false })
  id: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => User, { nullable: false })
  AssignedTo: User;

  @Field(() => ID, { nullable: false })
  assignedToId: string;

  @Field(() => User, { nullable: false })
  CreatedBy: User;

  @Field(() => ID, { nullable: false })
  createdById: string;

  @Field({ nullable: false })
  createdAt: string;

  @Field({ nullable: false })
  updatedAt: string;
}

import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NotificationDto {
  @Field()
  id: string;

  @Field()
  message: string;
}

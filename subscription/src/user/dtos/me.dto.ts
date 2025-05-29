import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MeDto {
  @Field()
  id: string;
}

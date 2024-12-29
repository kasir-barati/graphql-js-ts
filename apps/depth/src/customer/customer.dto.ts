import { Field, ID, ObjectType } from 'type-graphql';
import { BusinessDto } from '../business/dto/business.dto';

@ObjectType()
export class CustomerDto {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => ID)
  shopAtId: string;

  @Field(() => BusinessDto)
  shopAt: BusinessDto;
}

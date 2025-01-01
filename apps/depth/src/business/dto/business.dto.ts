import { createConnectionType } from '@shared';
import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
} from 'type-graphql';
import { CustomerDto } from '../../customer/dto/customer.dto';

@ObjectType('Business')
export class BusinessDto {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => [CustomerDto])
  customers: CustomerDto[];

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
export const BusinessDtoConnection =
  createConnectionType(BusinessDto);

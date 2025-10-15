import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsInt, ValidateNested } from 'class-validator';

@InputType()
class SomeField {
  @Field()
  @IsInt()
  some: number;
}

@InputType()
export class TestInput {
  @Field()
  @ValidateNested()
  @Type(() => SomeField)
  someField: SomeField;
}

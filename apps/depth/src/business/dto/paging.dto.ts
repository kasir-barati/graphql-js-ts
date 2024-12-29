import { IsOptional, IsString, Min } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class PagingDto {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  before?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  after?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Min(0)
  last?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Min(0)
  first?: number;
}

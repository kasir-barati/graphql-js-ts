import { Field, InputType } from '@nestjs/graphql';
import { AnyOf } from '@shared';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsString,
  ValidateNested,
} from 'class-validator';

@InputType()
export class AdminUserInput {
  @Field()
  @IsEmail()
  email: string;
}

@InputType()
export class ModeratorUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field(() => [String])
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  accessRights: string[];
}

@InputType()
@AnyOf(['admin', 'moderator'])
export class DefineUserInput {
  @Field(() => AdminUserInput, { nullable: true })
  @ValidateNested()
  @Type(() => AdminUserInput)
  admin?: AdminUserInput;

  @Field(() => ModeratorUserInput, { nullable: true })
  @ValidateNested()
  @Type(() => ModeratorUserInput)
  moderator?: ModeratorUserInput;
}

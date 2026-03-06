# Input

- When you have a create input and wanted to have the same fields, but they will be all optional:

  ```ts
  import { Field, InputType, PartialType } from '@nestjs/graphql';
  import { IsEmail } from 'class-validator';

  @InputType()
  export class CreateInput {
    @Field(() => String)
    @IsEmail()
    email: string;
  }

  @InputType()
  export class UpdateInput extends PartialType(CreateInput) {}
  ```

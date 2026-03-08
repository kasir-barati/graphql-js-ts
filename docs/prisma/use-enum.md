# Use Exported Enum from Prisma

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

enum UserStatus {
  ACTIVE
  INACTIVE
  PENDING
}

model User {
  id        Int        @id @default(autoincrement())
  status    UserStatus @default(PENDING)
}
```

```ts
// resolver.ts
import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserStatus } from '@prisma/client';

registerEnumType(UserStatus, {
  name: 'UserStatus',
  description: 'The status of a user',
});

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => UserStatus)
  status: UserStatus;
}


@Resolver(() => User)
export class UserResolver {
  @Query(() => User)
  async user(@Args('status', { type: () => UserStatus }) status: UserStatus) {
    return {
      id: 1,
      status,
    };
  }
}
```

And now you can query the data:

```graphql
query {
  user(status: INACTIVE) {
    status
  }
}
```

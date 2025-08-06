import {
  Context,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { GreetMeType } from './greet-me.type';

@Resolver(() => GreetMeType)
export class GreetMeResolver {
  @ResolveField(() => String)
  message(@Context() context: any, @Parent() parent: GreetMeType) {
    return `Hi ${context.name}, the parent resolver said: ${parent.parentResolverMessage}`;
  }
}

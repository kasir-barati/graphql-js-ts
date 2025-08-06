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
  message(@Context() context: any, @Parent() parent: any) {
    // TODO: How I can access the someField
    console.dir(parent, { depth: null });

    return `Hi ${context.name}`;
  }
}

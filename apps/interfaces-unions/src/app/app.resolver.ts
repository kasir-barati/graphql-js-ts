import { Query, Resolver } from '@nestjs/graphql';

import { AppService } from './app.service';
import { UnionOfRobots } from './types/union-of-robots.type';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  getData(): string {
    return this.appService.getData();
  }

  @Query(() => [UnionOfRobots], {
    description: 'Get all robots',
  })
  robots(): Array<typeof UnionOfRobots> {
    return this.appService.getRobots();
  }
}

import { Query, Resolver } from '@nestjs/graphql';

import { AppService } from './app.service';
import { RobotInterface } from './types/robot-interface.type';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  getData(): string {
    return this.appService.getData();
  }

  @Query(() => [RobotInterface], {
    description: 'Get all robots',
  })
  robots(): Array<RobotInterface> {
    return this.appService.getRobots();
  }
}

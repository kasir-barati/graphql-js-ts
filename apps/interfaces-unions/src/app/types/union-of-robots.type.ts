import { createUnionType } from '@nestjs/graphql';

import { HumanoidRobot } from './humanoid.type';
import { ScaraRobot } from './scara.type';

export const UnionOfRobots = createUnionType({
  name: 'UnionOfRobots',
  description: 'Union of robots fields',
  types: () => [HumanoidRobot, ScaraRobot] as const,
  resolveType: (value) => {
    if ('height' in value) {
      return HumanoidRobot;
    }

    return ScaraRobot;
  },
});

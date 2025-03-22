import { Field, ID, InterfaceType } from '@nestjs/graphql';

import { HumanoidRobot } from './humanoid.type';
import { ScaraRobot } from './scara.type';

@InterfaceType({
  description: 'Common fields, available for all robots',
  resolveType: (value) => {
    if ('height' in value) {
      return HumanoidRobot;
    }
    return ScaraRobot;
  },
})
export abstract class RobotInterface {
  @Field(() => ID, { description: 'ID of the robot' })
  id: string;

  @Field(() => String, { description: 'Name of the robot' })
  name: string;

  @Field(() => String, {
    description: 'The COLLADA image of the robot',
  })
  colladaImage: string;

  @Field(() => String, { description: 'Description of the robot' })
  description: string;

  @Field(() => String, { description: 'Model number of the robot' })
  modelNumber: string;
}

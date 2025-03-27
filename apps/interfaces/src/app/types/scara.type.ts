import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

import { RobotInterface } from './robot-interface.type';

@ObjectType({
  implements: () => [RobotInterface],
  description:
    'Scara robot, specialized for tasks requiring high precision & speed',
})
export class ScaraRobot implements RobotInterface {
  id: string;
  name: string;
  colladaImage: string;
  description: string;
  modelNumber: string;

  @Field(() => Int, {
    description: 'Number of axes',
  })
  axes: number;

  @Field(() => Float, {
    description: 'Payload capacity in kg',
  })
  payload: number;
}

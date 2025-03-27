import { Field, Float, ObjectType } from '@nestjs/graphql';

import { RobotInterface } from './robot-interface.type';

@ObjectType({
  implements: () => [RobotInterface],
  description: 'Humaniod robot',
})
export class HumanoidRobot implements RobotInterface {
  id: string;
  name: string;
  colladaImage: string;
  description: string;
  modelNumber: string;

  @Field(() => Float, {
    description: 'Height of the humaniod robot',
  })
  height: number;

  @Field(() => Boolean, {
    description:
      'Can humaniod robot work with verbal commands and speak?',
  })
  speechRecognition: boolean;
}

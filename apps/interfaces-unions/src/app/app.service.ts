import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { HumanoidRobot } from './types/humanoid.type';
import { ScaraRobot } from './types/scara.type';
import { UnionOfRobots } from './types/union-of-robots.type';

@Injectable()
export class AppService {
  getRobots(): Array<typeof UnionOfRobots> {
    const humaniodRobot: HumanoidRobot = {
      id: randomUUID(),
      name: `Humaniod robot`,
      colladaImage: 'https://example.com/humaniod-robot.dae',
      description: 'A robot ' + Math.random(),
      modelNumber: 'some-model-number',
      height: 180,
      speechRecognition: true,
    };
    const scaraRobot: ScaraRobot = {
      id: randomUUID(),
      name: `SCARA Robot`,
      colladaImage: 'https://example.com/robot.dae',
      description: 'A robot ' + Math.random(),
      modelNumber: Math.ceil(Math.random() * 100000000).toString(),
      axes: 4,
      payload: parseFloat((Math.random() * 100).toFixed(2)),
    };

    return [humaniodRobot, scaraRobot];
  }

  getData(): string {
    return 'Hello API';
  }
}

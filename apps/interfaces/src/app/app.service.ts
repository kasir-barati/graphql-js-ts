import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { HumanoidRobot } from './types/humanoid.type';
import { RobotInterface } from './types/robot-interface.type';
import { ScaraRobot } from './types/scara.type';

@Injectable()
export class AppService {
  getRobots(): Array<RobotInterface> {
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

import { SinonMock, SinonMockType } from '@testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let controller: AppController;
  let service: SinonMockType<AppService>;

  beforeAll(async () => {
    service = SinonMock.of(AppService);
    controller = new AppController(service);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(controller.getData()).toEqual({
        message: 'Hello API',
      });
    });
  });
});

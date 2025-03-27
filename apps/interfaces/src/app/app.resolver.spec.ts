import { Test, TestingModule } from '@nestjs/testing';

import { AppResolver } from './app.resolver';
import { AppService } from './app.service';

describe('AppResolver', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppResolver],
      providers: [{ provide: AppService, useValue: {} }],
    }).compile();
  });

  it('should return "Hello API"', () => {
    const resolver = app.get(AppResolver);
    jest
      .spyOn(resolver['appService'], 'getData')
      .mockReturnValue('Hello API');

    const res = resolver.getData();

    expect(res).toBe('Hello API');
  });
});

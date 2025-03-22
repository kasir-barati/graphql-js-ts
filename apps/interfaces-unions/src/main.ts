import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ConfigType } from '@nestjs/config';
import { AppModule } from './app/app.module';
import appConfig from './app/configs/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { PORT } = app.get<ConfigType<typeof appConfig>>(
    appConfig.KEY,
  );

  app.enableCors();

  await app.listen(PORT);

  Logger.log(
    `🚀 Application is running on: http://localhost:${PORT}/graphql`,
  );
  Logger.log(
    `🚀 GraphQL IDE is running on: http://localhost:${PORT}/graphql`,
  );
}

bootstrap();

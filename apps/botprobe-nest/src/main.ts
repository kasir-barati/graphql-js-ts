import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const port = process.env.PORT || 4006;
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/graphql`,
  );
}

bootstrap();

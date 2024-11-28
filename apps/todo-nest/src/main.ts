import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const port = process.env.PORT || 4004;

  app.setGlobalPrefix(globalPrefix);
  app.enableCors();

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
  Logger.log(`🚀 Subscribe to: ws://localhost:${port}/graphql`);
  Logger.log(
    `🚀 GraphQL IDE is running on: http://localhost:${port}/graphql`,
  );
}

bootstrap();

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { CronTopModule, PubSubModule } from '@shared';
import { join } from 'path';
import { TodoModule } from '../todo/todo.module';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: [join(__dirname, '..', '..', '.env')],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // Options will be passed down to apollo server
      driver: ApolloDriver,
      autoSchemaFile: join(__dirname, 'src', 'schema.gql'),
      sortSchema: true,
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    UserModule,
    TodoModule,
    PubSubModule,
    CronTopModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}

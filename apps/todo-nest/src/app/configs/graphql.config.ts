import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { join } from 'path';
import appConfig from './app.config';

export class GraphQLConfig implements GqlOptionsFactory {
  constructor(
    @Inject(appConfig.KEY)
    private readonly appConfigs: ConfigType<typeof appConfig>,
  ) {}

  createGqlOptions():
    | Omit<GqlModuleOptions<any>, 'driver'>
    | Promise<Omit<GqlModuleOptions<any>, 'driver'>> {
    return {
      // Options will be passed down to apollo server
      autoSchemaFile: join(__dirname, 'src', 'schema.gql'),
      sortSchema: true,
      path: '/graphql',
      debug: this.appConfigs.NODE_ENV !== 'production',
    };
  }
}

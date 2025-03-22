import { registerAs } from '@nestjs/config';
import { validateEnvs } from '@shared';
import { IsIn, IsInt, IsOptional } from 'class-validator';

import { AppConfig } from '../app.type';

export default registerAs('appConfigs', (): AppConfig => {
  const validatedEnvs = validateEnvs(process.env, Environment);

  return validatedEnvs;
});

class Environment implements AppConfig {
  @IsOptional()
  @IsIn(['development', 'production', 'test'])
  NODE_ENV: 'development' | 'production' | 'test' = 'development';

  @IsOptional()
  @IsInt()
  PORT: number = 4010;
}

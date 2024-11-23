import { registerAs } from '@nestjs/config';
import { IsInt, IsString } from 'class-validator';
import { RedisOptions } from 'ioredis';
import { validateEnvs } from '../../../utils/validate-envs.utils';

export default registerAs('pubSubRedisConfigs', (): RedisOptions => {
  const validatedEnvs = validateEnvs(
    process.env,
    EnvironmentVariables,
  );

  return {
    host: validatedEnvs.REDIS_HOST,
    port: validatedEnvs.REDIS_PORT,
    password: validatedEnvs.REDIS_PASSWORD,
  };
});

class EnvironmentVariables {
  @IsString()
  REDIS_HOST: string;

  @IsInt()
  REDIS_PORT: number;

  @IsString()
  REDIS_PASSWORD: string;
}

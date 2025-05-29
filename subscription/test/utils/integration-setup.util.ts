import {
  RedisContainer,
  StartedRedisContainer,
} from '@testcontainers/redis';

interface CreateRedisContainerOptions {
  port?: number;
  imageName?: string;
}

export function createRedisContainer(
  options?: CreateRedisContainerOptions,
): Promise<StartedRedisContainer> {
  return new RedisContainer(options?.imageName ?? 'redis:8.0-alpine')
    .withExposedPorts(options?.port ?? 6379)
    .start();
}

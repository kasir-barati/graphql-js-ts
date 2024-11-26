export function getEnv() {
  const port = 4005;
  const frontendUrl = 'https://example.com';

  return {
    port,
    frontendUrl,
    redis: {
      port: 7000,
      host: 'localhost',
      password: 'password',
    },
  };
}

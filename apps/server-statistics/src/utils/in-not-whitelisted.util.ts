import { getEnv } from './env.util';

const { frontendUrl, port } = getEnv();
const whitelist = [
  'http://localhost',
  'http://127.0.0.1',
  `http://localhost:${port}`,
  `http://127.0.0.1:${port}`,
  frontendUrl,
];

export function isNotWhiteListed(origin: string) {
  return whitelist.indexOf(origin) === -1;
}

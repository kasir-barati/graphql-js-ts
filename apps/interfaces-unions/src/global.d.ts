import { AppConfig } from './app/app.type';

declare global {
  namespace NodeJS {
    interface ProcessEnv extends AppConfig {}
  }
}

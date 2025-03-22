import { AppConfig } from './app/app.type';

declare global {
  namespace NodeJS {
    type ProcessEnv = AppConfig
  }
}

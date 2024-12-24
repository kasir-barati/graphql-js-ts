export interface AppConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  DATABASE_URL: string;
}
namespace NodeJS {
  export interface ProcessEnv extends AppConfig {}
}

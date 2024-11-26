import { Response } from './common.type';

export type GreetResponse = Response<{
  greet: string;
}>;

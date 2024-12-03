import { Response } from '@testing';

export type GreetResponse = Response<{
  greet: string;
}>;

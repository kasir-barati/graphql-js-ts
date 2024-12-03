import { Response } from '@testing';

export type TopResponse = Response<{
  top: {
    cpu: number;
    memory: number;
  };
}>;
export type GreetResponse = Response<{
  greet: string;
}>;

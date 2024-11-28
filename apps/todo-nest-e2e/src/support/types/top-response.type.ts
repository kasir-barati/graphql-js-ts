import { Response } from './common.type';

export type TopResponse = Response<{
  top: {
    cpu: number;
    memory: number;
  };
}>;

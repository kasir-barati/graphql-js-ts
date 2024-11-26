import { Response } from './common.type';

export type TopResponse = Response<{
  top: {
    cpu: number;
  };
}>;
export type HtopResponse = Response<{
  htop: {
    memory: number;
  };
}>;

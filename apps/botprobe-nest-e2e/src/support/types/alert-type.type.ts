import { Response } from './common.type';

export type AlertTypesResponse = Response<{
  alertTypes: {
    id: string;
    name: string;
    Alert: {
      id: string;
      title: string;
    };
  };
}>;

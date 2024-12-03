import { Response } from '@testing';

export type AlertTypesResponse = Response<{
  alertTypes: [
    {
      id: string;
      name: string;
      Alerts: [
        {
          id: string;
          title: string;
        },
      ];
    },
  ];
}>;

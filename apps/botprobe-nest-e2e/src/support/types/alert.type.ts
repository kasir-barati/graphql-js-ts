import { Response } from '@testing';

export type AlertBuilderResponse = Response<{
  create: {
    id: string;
  };
}>;
export type CreateAlertResponse = Response<{
  create: {
    id: string;
    title: string;
    AlertType: {
      id: string;
      name: string;
    };
  };
}>;
export type SearchAlertResponse = Response<{
  search: [
    {
      id: string;
      title: string;
      AlertType: {
        id: string;
        name: string;
      };
    },
  ];
}>;

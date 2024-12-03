import { Response } from '@testing';

export type CreateUserBuilderResponse = Response<{
  createUser: { id: string };
}>;
export type CreateUserResponse = Response<{
  createUser: { id: string; username: string; createdAt: string };
}>;

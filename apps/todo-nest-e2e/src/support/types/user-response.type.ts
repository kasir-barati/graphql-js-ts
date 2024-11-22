import { Response } from './common.type';

export type CreateUserBuilderResponse = Response<{
  createUser: { id: string };
}>;
export type CreateUserResponse = Response<{
  createUser: { id: string; username: string; createdAt: string };
}>;

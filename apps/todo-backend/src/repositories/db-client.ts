import { PrismaClient } from '@prisma/client';
import { DbClient } from '../types/repository.type';

let dbClient: DbClient;

export function getDbClient(): DbClient {
  if (!dbClient) {
    dbClient = new PrismaClient({
      log: ['query'],
    });
  }

  return dbClient;
}

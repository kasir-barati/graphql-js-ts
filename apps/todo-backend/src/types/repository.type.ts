import { PrismaClient, Todo as PrismaTodo } from '@prisma/client';

export type DbClient = PrismaClient;
export type Todo = PrismaTodo;

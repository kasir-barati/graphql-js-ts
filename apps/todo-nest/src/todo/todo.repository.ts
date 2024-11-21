import { Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { PrismaService } from '@shared';

@Injectable()
export class TodoRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async read(id: string) {
    const result = await this.prismaService.$queryRaw<
      [Todo]
    >`WITH todo AS (
        SELECT id, title, content, created_at as "createdAt", updated_at as "updatedAt", created_by_id as "createdById", assigned_to_id as "assignedToId"
        FROM public.todos AS todos
        WHERE todos.id = ${id}
      ), created_by AS (
        SELECT public.users.id, public.users.username, public.users.created_at as "createdAt", public.users.updated_at as "updatedAt"
        FROM public.users, todo
        WHERE public.users.id = todo."createdById"
      ), "CreatedBy" AS (
        SELECT (JSON_AGG(created_by.*) ->> 0)::JSON AS "CreatedBy"
        FROM created_by
      ), assigned_by AS (
        SELECT 
          CASE 
            WHEN todo."assignedToId" IS NOT NULL THEN (
              SELECT (JSON_AGG(assigned_user.*) ->> 0)::JSON
              FROM (
                SELECT public.users.*
                FROM public.users, todo
                WHERE public.users.id = todo."assignedToId"
              ) AS assigned_user
            )
          END AS "AssignedBy"
        FROM todo
      )
      SELECT *
      FROM todo, "CreatedBy", assigned_by`;

    return result[0];
  }

  create({
    title,
    content,
    createdById,
    assignedToId,
  }: {
    title: string;
    content: string;
    createdById: string;
    assignedToId?: string;
  }) {
    return this.prismaService.todo.create({
      data: {
        title,
        content,
        createdById,
        assignedToId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        CreatedBy: true,
        createdById: true,
        ...(assignedToId && { AssignedTo: true, assignedToId: true }),
      },
    });
  }

  update(
    id: string,
    {
      title,
      content,
      createdById,
      assignedToId,
    }: {
      title?: string;
      content?: string;
      createdById?: string;
      assignedToId?: string;
    },
  ) {
    return this.prismaService.todo.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        createdById,
        assignedToId,
      },
      include: {
        CreatedBy: true,
        AssignedTo: true,
      },
    });
  }

  async delete(id: string) {
    await this.prismaService.todo.delete({
      where: {
        id,
      },
    });
  }
}

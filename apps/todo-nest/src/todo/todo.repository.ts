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
      ), assigned_to AS (
        SELECT 
          CASE 
            WHEN todo."assignedToId" IS NOT NULL THEN (
              SELECT (JSON_AGG(assigned_to_user.*) ->> 0)::JSON
              FROM (
                SELECT public.users.*
                FROM public.users, todo
                WHERE public.users.id = todo."assignedToId"
              ) AS assigned_to_user
            )
          END AS "AssignedTo"
        FROM todo
      )
      SELECT *
      FROM todo, "CreatedBy", assigned_to
    `;

    return result[0];
  }

  async create({
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
    const result = await this.prismaService.$queryRaw<
      [Todo]
    >`WITH created_todo AS (
        INSERT INTO public.todos (id, title, content, created_at, updated_at, created_by_id, assigned_to_id) 
        VALUES (GEN_RANDOM_UUID(), ${title}, ${content}, NOW(), NOW(), ${createdById}, ${assignedToId ?? null}) 
        RETURNING public.todos.id, public.todos.title, public.todos.content, public.todos.created_at AS "createdAt", public.todos.updated_at AS "updatedAt", public.todos.created_by_id AS "createdById", public.todos.assigned_to_id AS "assignedToId"
      ), created_by AS (
        SELECT public.users.id, public.users.username, public.users.created_at as "createdAt", public.users.updated_at as "updatedAt"
        FROM public.users, created_todo
        WHERE public.users.id = created_todo."createdById"
      ), "CreatedBy" AS (
        SELECT (JSON_AGG(created_by.*) ->> 0)::JSON AS "CreatedBy"
        FROM created_by
      ), assigned_to AS (
        SELECT
          CASE
            WHEN created_todo."assignedToId" IS NOT NULL THEN (
              SELECT (JSON_AGG(assigned_to_user.*) ->> 0)::JSON
              FROM (
                SELECT public.users.id, public.users.username, public.users.created_at as "createdAt", public.users.updated_at as "updatedAt"
                FROM public.users, created_todo
                WHERE public.users.id = created_todo."assignedToId"
              ) AS assigned_to_user
            )
          END AS "AssignedTo"
        FROM created_todo
      )
      SELECT *
      FROM created_todo, "CreatedBy", assigned_to
    `;

    return result[0];
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

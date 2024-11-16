import { DbClient } from '../types/repository.type';

export class TodoRepository {
  constructor(private readonly dbClient: DbClient) {}

  read(id: string) {
    // const todo = this.dbClient
    //   .$queryRaw<Todo>`SELECT id, title, content, created_at as "createdAt", updated_at as "updatedAt"
    //   FROM public.todos, public.users
    //   WHERE id = ${id}`;
    return this.dbClient.todo.findFirst({
      where: { id },
      include: { AssignedTo: true, CreatedBy: true },
    });
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
    return this.dbClient.todo.create({
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
    return this.dbClient.todo.update({
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
  delete() {}
}

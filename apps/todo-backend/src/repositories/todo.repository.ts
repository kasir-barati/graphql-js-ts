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
      include: { assignedTo: true, createdBy: true },
    });
  }
  create() {}
  update() {}
  delete() {}
}

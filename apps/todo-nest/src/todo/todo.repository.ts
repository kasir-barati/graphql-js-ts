import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared';

@Injectable()
export class TodoRepository {
  constructor(private readonly prismaService: PrismaService) {}

  read(id: string) {
    return this.prismaService.todo.findFirst({
      where: { id },
      include: {
        AssignedTo: true,
        CreatedBy: true,
      },
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

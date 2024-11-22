import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@shared';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(username: string) {
    const result = await this.prismaService.$queryRaw<
      [User]
    >`INSERT INTO public.users (id, username, created_at, updated_at)
      VALUES (GEN_RANDOM_UUID(), ${username}, NOW(), NOW())
      RETURNING public.users.id, public.users.username, public.users.created_at AS "createdAt", public.users.updated_at AS "updatedAt"
    `;

    return result[0];
  }
  read(id: string) {
    return this.prismaService.user.findFirst({ where: { id } });
  }
}

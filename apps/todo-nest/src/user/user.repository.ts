import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(username: string) {
    return this.prismaService.user.create({
      data: {
        username,
      },
    });
  }
  read(id: string) {
    return this.prismaService.user.findFirst({ where: { id } });
  }
}

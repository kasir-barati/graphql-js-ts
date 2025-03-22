import { Module } from '@nestjs/common';
import { PrismaModule } from '@shared';

import { UserModule } from '../user/user.module';
import { TodoRepository } from './todo.repository';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';

@Module({
  imports: [UserModule, PrismaModule],
  providers: [TodoService, TodoRepository, TodoResolver],
})
export class TodoModule {}

import { Module } from '@nestjs/common';
import { PrismaModule } from '@shared';

import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserRepository, UserResolver],
  exports: [UserService],
})
export class UserModule {}

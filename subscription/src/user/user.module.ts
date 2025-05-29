import { Module } from '@nestjs/common';

import { pubsubProvider } from '../shared';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [UserResolver, UserService, pubsubProvider],
})
export class UserModule {}

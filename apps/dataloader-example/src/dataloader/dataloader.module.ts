import { Module } from '@nestjs/common';

import { PostModule } from '../post/post.module';
import { UserModule } from '../user/user.module';
import { DataloaderService } from './dataloader.service';

@Module({
  imports: [UserModule, PostModule],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}

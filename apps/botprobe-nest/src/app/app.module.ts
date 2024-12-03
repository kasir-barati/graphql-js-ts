import { Module } from '@nestjs/common';
import { AlertTypeModule } from '../alert-type/alert-type.module';
import { AlertModule } from '../alert/alert.module';

@Module({
  imports: [AlertModule, AlertTypeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

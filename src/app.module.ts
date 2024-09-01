import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [ClientModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

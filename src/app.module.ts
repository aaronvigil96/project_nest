import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { CommonModule } from './common/common.module';
import { BrandModule } from './brand/brand.module';
import { ToolModule } from './tool/tool.module';

@Module({
  imports: [ClientModule, CommonModule, BrandModule, ToolModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { DmService } from './dm.service';
import { DmResolver } from './dm.resolver';

@Module({
  providers: [DmService, DmResolver]
})
export class DmModule {}

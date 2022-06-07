import { Module } from '@nestjs/common';
import { ServerService } from './server.service';
import { ServerResolver } from './server.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Server } from './entities/server.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Server])],
  providers: [ServerService, ServerResolver],
})
export class ServerModule {}

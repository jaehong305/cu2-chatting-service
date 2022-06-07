import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Server } from '../server/entities/server.entity';
import { User } from '../user/entities/user.entity';
import { ChannelResolver } from './channel.resolver';
import { ChannelService } from './channel.service';
import { Channel } from './entities/channel.entity';
import { ChannelChat } from './entities/channelChat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Channel, ChannelChat, Server])],
  providers: [ChannelResolver, ChannelService],
})
export class ChannelModule {}

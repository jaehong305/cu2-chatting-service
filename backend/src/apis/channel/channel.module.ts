import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from '../events/events.module';
import { Server } from '../server/entities/server.entity';
import { User } from '../user/entities/user.entity';
import { ChannelResolver } from './channel.resolver';
import { ChannelService } from './channel.service';
import { Channel } from './entities/channel.entity';
import { ChannelChat } from './entities/channelChat.entity';
import { Tag } from './entities/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Channel, ChannelChat, Server, Tag]),
    ElasticsearchModule.register({
      node: 'http://elasticsearch:9200',
    }),
    EventsModule,
  ],
  providers: [ChannelResolver, ChannelService],
})
export class ChannelModule {}

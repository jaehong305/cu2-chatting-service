import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, MoreThan, Repository } from 'typeorm';
import { EventsGateway } from '../events/events.gateway';
import { Server } from '../server/entities/server.entity';
import { User } from '../user/entities/user.entity';
import { Channel } from './entities/channel.entity';
import { ChannelChat } from './entities/channelChat.entity';
import { ChannelMember } from './entities/channelMember.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel) private readonly channelRepository: Repository<Channel>,
    @InjectRepository(User) private readonly userReposiotry: Repository<User>,
    @InjectRepository(Server) private readonly serverRepository: Repository<Server>,
    @InjectRepository(ChannelChat) private readonly channelChatRepository: Repository<ChannelChat>,
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    private readonly connection: Connection,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async getAllChannelsInServer(serverId) {
    return await this.channelRepository
      .createQueryBuilder('channel')
      .innerJoin('channel.Server', 'server', 'server.id = :serverId', { serverId })
      .getMany();
  }

  async getAllMyChannelsInServer({ serverId, currentUser }) {
    return await this.channelRepository
      .createQueryBuilder('channel')
      .innerJoin('channel.Server', 'server', 'server.id = :serverId', { serverId })
      .innerJoin('channel.ChannelMembers', 'channelMembers', 'channelMembers.User.email = :email', {
        email: currentUser.email,
      })
      .getMany();
  }

  async getAllUsersAndCountInChannel({ channelId }) {
    return await this.userReposiotry
      .createQueryBuilder('user')
      .innerJoin('user.ChannelMembers', 'channelMembers')
      .innerJoin('channelMembers.Channel', 'channel', 'channel.id = :channelId', { channelId })
      .getManyAndCount();
  }

  async getAllChannelChats({ channelId, page }) {
    return await this.channelChatRepository
      .createQueryBuilder('channelChat')
      .innerJoin('channelChat.Channel', 'channel', 'channel.id = :channelId', { channelId })
      .innerJoinAndSelect('channelChat.User', 'user')
      .orderBy('channelChat.id', 'DESC')
      .take(20)
      .skip(20 * (page - 1))
      .getMany();
  }

  async getChannelUnreadsCount({ channelId, after }) {
    const channel = await this.channelRepository
      .createQueryBuilder('channel')
      .where('channel.id = :channelId', { channelId })
      .getOne();

    // await this.channelChatRepository.createQueryBuilder('channelChat').innerJoin('channelChat.Channel', 'channel', 'channel.id = :channelId', {channelId})
    // .where('channelChat.createdAt > :after', {after})
    // .getCount()

    return await this.channelChatRepository.count({
      where: {
        Channel: channel,
        createdAt: MoreThan(new Date(after)),
      },
    });
  }

  async createChannelInServer({ createChannelInput, currentUser }) {
    const { serverId, tags, ...rest } = createChannelInput;
    const server = await this.serverRepository.findOne({ id: serverId });
    if (!server) throw new NotFoundException('존재하지 않는 서버입니다.');
    const owner = await this.userReposiotry.findOne({ email: currentUser.email });

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      const result = [];
      const tagnames = tags.map((el) => el.replace('#', ''));
      const prevTags = await Promise.all(
        tagnames.map((name) =>
          queryRunner.manager.getRepository(Tag).findOne({ name }, { lock: { mode: 'pessimistic_write' } }),
        ),
      );
      const newTags = await Promise.all(
        prevTags
          .map((prevTag, i) => {
            if (!prevTag) {
              return queryRunner.manager.getRepository(Tag).save({ name: tagnames[i] });
            } else {
              result.push(prevTag);
            }
          })
          .filter((el) => el),
      );
      const Tags = [...result, ...newTags];

      const channel = await queryRunner.manager
        .getRepository(Channel)
        .save({ ...rest, Server: server, Owner: owner, Tags });
      await queryRunner.manager.getRepository(ChannelMember).save({ User: owner, Channel: channel });
      await queryRunner.commitTransaction();
      return channel;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async createChannelMember({ channelId, currentUser }) {
    const channel = await this.channelRepository.findOne({ id: channelId });
    if (!channel) throw new NotFoundException('채널이 존재하지 않습니다.');
    const user = await this.userReposiotry.findOne({ email: currentUser.email });

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.getRepository(ChannelChat).save({ enter: true, Channel: channel, User: user });
      await queryRunner.manager.getRepository(ChannelMember).save({ Channel: channel, User: user });
      await queryRunner.commitTransaction();
      return `${user.nickname} 님이 들어왔습니다.`;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async createChannelChat({ currentUser, content, channelId }) {
    const channel = await this.channelRepository.findOne({ id: channelId });
    if (!channel) throw new NotFoundException('채널이 존재하지 않습니다.');
    const user = await this.userReposiotry.findOne({ email: currentUser.email });
    const channelChatWithUser = await this.channelChatRepository.save({ Channel: channel, User: user, content });
    this.eventsGateway.server.to(`${channel.Server.id}-${channelId}`).emit('message', channelChatWithUser);
  }
}

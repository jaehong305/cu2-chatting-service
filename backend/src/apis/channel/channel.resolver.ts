import { UseGuards } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { ChannelService } from './channel.service';
import { CreateChannelInput } from './dto/createChannel.input';
import { GetUsersAndCount } from './dto/getUsersAndCount';
import { Channel } from './entities/channel.entity';
import { ChannelChat } from './entities/channelChat.entity';

@Resolver()
export class ChannelResolver {
  constructor(
    private readonly channelService: ChannelService,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  @Query(() => [Channel])
  async fetchAllChannelsInServer(@Args('serverId') serverId: string) {
    return await this.channelService.getAllChannelsInServer(serverId);
  }

  @Query(() => [Channel])
  async searchChannelsInServer(@Args('search') search: string) {
    const result = await this.elasticsearchService.search({
      index: 'channel',
      from: 0,
      size: 20,
      query: {
        multi_match: {
          query: search,
          fields: ['name', 'intro'],
        },
      },
    });

    console.log(JSON.stringify(result, null, ' '));

    const channels = result.hits.hits.map((e: any) => ({
      id: e._source.id,
      name: e._source.name,
      intro: e._source.intro,
    }));

    return channels;
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Channel])
  async fetchAllMyChannelsInServer(@Args('serverId') serverId: string, @CurrentUser() currentUser: ICurrentUser) {
    return await this.channelService.getAllMyChannelsInServer({ serverId, currentUser });
  }

  @Query(() => GetUsersAndCount)
  async fetchAllUsersAndCountInChannel(@Args('channelId') channelId: string) {
    return await this.channelService.getAllUsersAndCountInChannel({ channelId });
  }

  @Query(() => [ChannelChat])
  async fetchAllChannelChats(@Args('channelId') channelId: string, @Args('page') page: number) {
    return await this.channelService.getAllChannelChats({ channelId, page });
  }

  @Query(() => Int)
  async fetchChannelUnreadCount(@Args('channelId') channelId: string, @Args('after') after: Date) {
    return await this.channelService.getChannelUnreadsCount({ channelId, after });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Channel)
  async createChannel(
    @Args('createChannelInput') createChannelInput: CreateChannelInput,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return await this.channelService.createChannelInServer({ createChannelInput, currentUser });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async joinChannel(@Args('channelId') channelId: string, @CurrentUser() currentUser: ICurrentUser) {
    return await this.channelService.createChannelMember({ channelId, currentUser });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => ChannelChat)
  async sendChannelMessage(
    @Args('channelId') channelId: string,
    @Args('content') content: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return await this.channelService.createChannelChat({ currentUser, content, channelId });
  }
}

import { Field, InputType, PickType } from '@nestjs/graphql';
import { Channel } from '../entities/channel.entity';

@InputType()
export class CreateChannelInput extends PickType(Channel, ['name', 'intro'], InputType) {
  @Field(() => String)
  serverId: string;
}

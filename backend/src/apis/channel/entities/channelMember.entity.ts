import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/user/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Channel } from './channel.entity';

@Entity()
@ObjectType()
export class ChannelMember {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @ManyToOne(() => User, (user) => user.ChannelMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => User)
  User: User;

  @ManyToOne(() => Channel, (channel) => channel.ChannelMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => Channel)
  Channel: Channel;
}

import { Field, ObjectType } from '@nestjs/graphql';
import { Server } from 'src/apis/server/entities/server.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChannelChat } from './channelChat.entity';
import { ChannelMember } from './channelMember.entity';
import { Tag } from './tag.entity';

@Entity()
@ObjectType()
export class Channel {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column({ type: 'text' })
  @Field(() => String)
  intro: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @ManyToOne(() => Server, { eager: true })
  @Field(() => Server)
  Server: Server;

  @ManyToOne(() => User)
  @Field(() => User)
  Owner: User;

  @OneToMany(() => ChannelMember, (channelMember) => channelMember.Channel)
  @Field(() => [ChannelMember])
  ChannelMembers: ChannelMember[];

  @OneToMany(() => ChannelChat, (channelchat) => channelchat.Channel)
  @Field(() => [ChannelChat])
  ChannelChats: ChannelChat[];

  @JoinTable()
  @ManyToMany(() => Tag, (tags) => tags.Channels)
  @Field(() => [Tag])
  Tags: Tag[];
}

import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, Matches } from 'class-validator';
import { ServerMember } from 'src/apis/server/entities/serverMember.entity';
import { ChannelMember } from 'src/apis/channel/entities/channelMember.entity';
import { ChannelChat } from 'src/apis/channel/entities/channelChat.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @IsEmail()
  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  password: string;

  @Matches('^[가-힣]{2,6}$')
  @Column({ unique: true })
  @Field(() => String)
  nickname: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  image?: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  @Field(() => Date, { nullable: true })
  deletedAt?: Date | null;

  @OneToMany(() => ServerMember, (serverMember) => serverMember.User)
  @Field(() => [ServerMember])
  ServerMembers: ServerMember[];

  @OneToMany(() => ChannelMember, (channelMember) => channelMember.User)
  @Field(() => [ChannelMember])
  ChannelMembers: ChannelMember[];

  @OneToMany(() => ChannelChat, (channelChat) => channelChat.User)
  @Field(() => [ChannelChat])
  ChannelChats: ChannelChat[];
}

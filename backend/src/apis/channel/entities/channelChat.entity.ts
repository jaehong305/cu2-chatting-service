import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Channel } from './channel.entity';

@Entity()
@ObjectType()
export class ChannelChat {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  content?: string;

  @Column({ default: false })
  @Field(() => Boolean)
  enter: boolean;

  @Column({ default: false })
  @Field(() => Boolean)
  exit: boolean;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @ManyToOne(() => Channel, (channel) => channel.ChannelChats)
  @Field(() => Channel)
  Channel: Channel;

  @ManyToOne(() => User, (user) => user.ChannelChats)
  @Field(() => User)
  User: User;
}

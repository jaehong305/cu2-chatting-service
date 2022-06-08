import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Channel } from './channel.entity';

@Entity()
@ObjectType()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToMany(() => Channel, (channels) => channels.Tags)
  @Field(() => [Channel])
  Channels: Channel[];
}

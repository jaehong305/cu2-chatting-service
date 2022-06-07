import { Field, ObjectType } from '@nestjs/graphql';
import { Server } from 'src/apis/server/entities/server.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ServerMember {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @ManyToOne(() => User, (user) => user.ServerMembers, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @Field(() => User)
  User: User;

  @ManyToOne(() => Server, (server) => server.ServerMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => Server)
  Server: Server;
}

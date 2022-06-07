import { Field, ObjectType } from '@nestjs/graphql';
import { ServerMember } from 'src/apis/server/entities/serverMember.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Server {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @OneToMany(() => ServerMember, (serverMember) => serverMember.Server)
  @Field(() => [ServerMember])
  ServerMembers: ServerMember[];
}

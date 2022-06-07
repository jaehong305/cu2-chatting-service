import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/user/entities/user.entity';

@ObjectType()
export class GetUsersAndCount {
  @Field(() => [User])
  users: User[];

  @Field(() => Int)
  count: number;
}

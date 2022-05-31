import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.Input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  async fetchUser() {
    return 'aa';
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput, @Context() context) {
    const email = context.req.headers.cookie
      .split('; ')
      .filter((e) => e.includes('email='))[0]
      .replace('email=', '');
    return await this.userService.create({ email, createUserInput });
  }
}

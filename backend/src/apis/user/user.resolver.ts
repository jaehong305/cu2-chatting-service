import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.interceptor';
import { CreateUserInput } from './dto/createUser.Input';
import { UpdateNicknameInput } from './dto/updateNickname.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@UseInterceptors(UndefinedToNullInterceptor)
@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  async fetchUser(@CurrentUser() currentUser: ICurrentUser) {
    return await this.userService.findOne({ email: currentUser.email });
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create({ createUserInput });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User)
  async updateNickname(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('updateNicknameInput') updateNicknameInput: UpdateNicknameInput,
  ) {
    return await this.userService.updateNickname({
      email: currentUser.email,
      nickname: updateNicknameInput.nickname,
    });
  }

  @Mutation(() => User)
  createTest(@Args('email') email: string, @Args('password') password: string, @Args('nickname') nickname: string) {
    return this.userService.createTestID({ email, password, nickname });
  }
}

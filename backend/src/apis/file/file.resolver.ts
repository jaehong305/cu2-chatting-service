import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileService } from './file.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';

@Resolver()
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @Mutation(() => [String])
  async uploadFile(@Args({ name: 'files', type: () => [GraphQLUpload] }) files: FileUpload[]) {
    return await this.fileService.upload({ files });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => [String])
  async updateFile(
    @Args({ name: 'files', type: () => [GraphQLUpload] }) files: FileUpload[],
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return await this.fileService.update({ files, currentUser });
  }
}

import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Server } from './entities/server.entity';
import { ServerService } from './server.service';

@Resolver()
export class ServerResolver {
  constructor(private readonly serverService: ServerService) {}

  @Mutation(() => Server)
  async createServer(@Args('name') name: string) {
    return await this.serverService.create(name);
  }
}

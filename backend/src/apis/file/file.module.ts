import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { FileResolver } from './file.resolver';
import { FileService } from './file.service';

@Module({
  imports: [UserModule],
  providers: [FileResolver, FileService],
})
export class FileModule {}

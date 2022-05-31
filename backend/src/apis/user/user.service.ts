import {
  CACHE_MANAGER,
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne({ email }) {
    const user = await this.userRepository.findOne({
      select: ['email', 'nickname', 'image', 'createdAt'],
      where: { email },
    });
    return user;
  }

  async create({ email, createUserInput }) {
    const authEmail = await this.cacheManager.get(`email:${email}`);
    if (!authEmail) throw new UnauthorizedException('인증되지 않은 이메일입니다.');
    if (await this.findOne({ email })) throw new ConflictException('이미 가입된 이메일입니다.');
    const user = await this.userRepository.save({
      email,
      password: uuidv4(),
      ...createUserInput,
    });
    await this.cacheManager.del(`email:${email}`);
    return user;
  }
}

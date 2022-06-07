import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from 'src/common/auth/jwt-access.strategy';
import { JwtRefreshStrategy } from 'src/common/auth/jwt-refresh.strategy';
import { JwtGoogleStrategy } from 'src/common/auth/jwt-social-google.strategy';
import { JwtKakaoStrategy } from 'src/common/auth/jwt-social-kakao.strategy';
import { JwtNaverStrategy } from 'src/common/auth/jwt-social-naver.strategy';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, JwtModule.register({})],
  providers: [
    AuthResolver,
    AuthService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtNaverStrategy,
    JwtGoogleStrategy,
    JwtKakaoStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}

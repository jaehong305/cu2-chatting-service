import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Cache } from 'cache-manager';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {}

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: this.configService.get('ACCESS_TOKEN_KEY'), expiresIn: '1h' },
    );
  }

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: this.configService.get('REFRESH_TOKEN_KEY'), expiresIn: '2w' },
    );
    res.setHeader(
      'Set-Cookie',
      `refreshToken=${refreshToken}; path=/; domain=.ljh305.shop; SameSite=None; Secure; httpOnly;`,
    );
  }

  async OAuthLogin(req, res) {
    const user = await this.userService.findOne({ email: req.user.email });

    // 구글 로그인시 유저정보가 없다면 redis에 이메일저장 및 쿠키에 이메일 저장 후 회원가입페이지로 이동
    if (!user) {
      const email = await this.cacheManager.get(`email:${req.user.email}`);
      if (!email) await this.cacheManager.set(`email:${req.user.email}`, 'email', { ttl: 60 * 60 });

      res.setHeader(
        'Set-Cookie',
        `email=${req.user.email}; path=/; domain=.ljh305.shop; SameSite=None; Secure; httpOnly;`,
      );
      res.redirect(`${process.env.CLIENT_URL}/signup`);
      return;
    }

    this.setRefreshToken({ user, res });
    res.redirect(`${process.env.CLIENT_URL}/mypage`);
  }
}

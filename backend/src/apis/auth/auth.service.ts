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
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/; domain=.cu2.shop; Secure; httpOnly;`);
  }

  async OAuthLogin(req, res) {
    const user = await this.userService.findOne({ email: req.user.email });

    if (!user) {
      const email = await this.cacheManager.get(`email:${req.user.email}`);
      if (!email) await this.cacheManager.set(`email:${req.user.email}`, 'email', { ttl: 60 * 60 });

      res.redirect(`${process.env.CLIENT_URL}/signup?${req.user.email}`);
      return;
    }

    this.setRefreshToken({ user, res });
    res.redirect(`${process.env.CLIENT_URL}/mypage`);
  }
}

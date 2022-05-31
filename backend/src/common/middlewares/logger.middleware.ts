import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // http관련 요청들 로그남기기
  private logger = new Logger('HTTP');

  // 미들웨어 구현
  use(req: Request, res: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = req;
    // 헤더에서 가져오기 없으면 ''
    const userAgent = req.get('user-agent') || '';

    // 응답이 끝났을 때 실행(비동기이벤트리스너) => 로그남기기
    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
    });

    next();
  }
}

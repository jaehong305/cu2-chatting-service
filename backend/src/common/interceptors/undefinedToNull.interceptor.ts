import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // controller 전 부분 작성

    // 응답시 전달되는 data 한번 더 가공 가능
    return next.handle().pipe(map((data) => (data === undefined ? null : data)));
  }
}

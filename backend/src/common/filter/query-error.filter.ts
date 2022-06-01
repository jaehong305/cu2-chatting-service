import { Catch, ExceptionFilter } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryErrorFilter implements ExceptionFilter {
  catch(exception: QueryFailedError) {
    const message = exception.message;

    console.log('===================');
    console.log('에러내용:', message);
    console.log('===================');
  }
}

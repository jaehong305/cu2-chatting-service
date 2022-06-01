import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { QueryErrorFilter } from './common/filter/query-error.filter';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter(), new QueryErrorFilter());
  app.enableCors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  });
  app.use(graphqlUploadExpress());
  await app.listen(4000);
}
bootstrap();

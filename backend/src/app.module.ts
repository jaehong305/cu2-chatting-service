import { CacheModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { UserModule } from './apis/user/user.module';
import { AuthModule } from './apis/auth/auth.module';
import { ServerModule } from './apis/server/server.module';
import { ChannelModule } from './apis/channel/channel.module';
import { DmModule } from './apis/dm/dm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RedisClientOptions } from 'redis';
import redisStore from 'cache-manager-redis-store';
import { FileModule } from './apis/file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/common/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin: [process.env.CLIENT_URL],
        credentials: true,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'cu2_database',
      port: 3306,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: 'cu2',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
      timezone: 'Asia/Seoul',
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://cu2_redis:6379',
      isGlobal: true,
    }),
    AuthModule,
    ChannelModule,
    DmModule,
    FileModule,
    ServerModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  // 원형 [{provide: AppService, useClass: AppService}] // provide에는 원래 키값이 와야하지만 클래스를 넣을경우 클래스 이름으로 찾아 해당값을 주입해준다.
  // [{provide: 'CUSTOM_KEY', useValue: 'CUSTOM_VALUE'}] // 키값을 넣을경우 Inject('CUSTOM_KEY') 해주어야 해당 값을 주입해준다.
  // [{provide: 'CUSTOM_KEY', useFactory: () => {return {a: 'b'}}}] // useFactory는 작업 수행 후 리턴값을 주입해준다.
})
export class AppModule implements NestModule {
  // 로거미들웨어 전체 라우터 적용
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ResponseTimeLoggerMiddleware } from './libs/middlewares/reponse-time-logger.middleware';
import { SystemModule } from './system/system.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [SystemModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseTimeLoggerMiddleware).forRoutes('*');
  }
}

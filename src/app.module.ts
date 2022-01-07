import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ResponseTimeLoggerMiddleware } from './libs/middlewares/reponse-time-logger.middleware';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseTimeLoggerMiddleware).forRoutes('*');
  }
}

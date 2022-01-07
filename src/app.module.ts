import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ResponseTimeLoggerMiddleware } from './middlewares/reponse-time-logger.middleware';
import { SystemModule } from './system/system.module';

@Module({
  imports: [SystemModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseTimeLoggerMiddleware).forRoutes('*');
  }
}

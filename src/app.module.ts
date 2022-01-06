import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseTimeLoggerMiddleware } from './middlewares/reponse-time-logger.middleware';
import { SystemModule } from './system/system.module';

@Module({
  imports: [SystemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseTimeLoggerMiddleware).forRoutes('*');
  }
}

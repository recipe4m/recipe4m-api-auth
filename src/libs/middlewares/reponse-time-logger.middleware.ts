import * as os from 'os';
import * as responseTime from 'response-time';

import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class ResponseTimeLoggerMiddleware implements NestMiddleware {
  logger = new Logger('ResponseTime');

  use = responseTime((req: Request, res: Response, time: number) => {
    const hostname = os.hostname;
    const method = req.method;
    const target = req.originalUrl;
    this.logger.log(`${hostname} ${method} ${target} ${time.toFixed(3)}ms`);
  });
}

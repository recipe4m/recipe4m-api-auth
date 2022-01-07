import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { JwtPayload, decode } from 'jsonwebtoken';
import { Request, Response } from 'express';

import { ApiBlockStatusError } from '@http-exceptions/api-block-status-error';
import { ApiDormantStatusError } from '@http-exceptions/api-dormant-status-error';
import { ApiExpiredTokenError } from '@http-exceptions/api-expired-token-error';
import { ApiForbiddenError } from '@http-exceptions/api-forbidden-error';
import { ApiNoPermissionError } from '@http-exceptions/api-no-permission-error';
import { ApiUnauthorizedError } from '@http-exceptions/api-unauthorized-error';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  logger = new Logger('HttpExceptionFilter');

  static ErrorUnauthorized = new ApiUnauthorizedError(
    '토큰이 올바르지 않습니다.',
  );

  static ErrorExpiredToken = new ApiExpiredTokenError('토큰이 만료되었습니다.');

  static ErrorForbidden = new ApiForbiddenError('접근이 거부되었습니다.');

  static ErrorNoPermission = new ApiNoPermissionError('권한이 없습니다.');

  static ErrorBlockStatus = new ApiBlockStatusError('차단된 사용자입니다.');

  static ErrorDormantStatus = new ApiDormantStatusError('휴먼계정입니다.');

  checkExpiration({ headers: { authorization } }: Request) {
    try {
      if (!authorization) return false;
      if (!/^bearer /i.test(authorization)) return false;
      const token = authorization.replace(/^bearer /i, '');
      const { exp } = decode(token) as JwtPayload;
      if (exp < new Date().valueOf() / 1000) return true;
      return false;
    } catch (error) {
      return false;
    }
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception.getStatus();

    switch (status) {
      case HttpStatus.UNAUTHORIZED:
        const error = this.checkExpiration(req)
          ? HttpExceptionFilter.ErrorExpiredToken
          : HttpExceptionFilter.ErrorUnauthorized;
        res.status(status).json(error);
        break;
      default:
        res.status(status).json(exception.getResponse());
        break;
    }
  }
}

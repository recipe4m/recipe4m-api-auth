import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { ApiError } from './api-error';
import { ErrorCode } from './error-code';
import { HttpStatus } from '@nestjs/common';

@ApiExtraModels()
export class ApiExpiredTokenError extends ApiError {
  @ApiProperty({
    default: HttpStatus.UNAUTHORIZED,
  })
  readonly httpStatus: HttpStatus;

  @ApiProperty({
    default: ErrorCode.EXPIRED_TOKEN,
  })
  readonly errorCode: ErrorCode;

  constructor(errorMsg: string) {
    super(HttpStatus.UNAUTHORIZED, ErrorCode.EXPIRED_TOKEN, errorMsg);
  }
}

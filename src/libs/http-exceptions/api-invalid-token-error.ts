import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { ApiError } from './api-error';
import { ErrorCode } from './error-code';
import { HttpStatus } from '@nestjs/common';

@ApiExtraModels()
export class ApiInvalidTokenError extends ApiError {
  @ApiProperty({
    default: HttpStatus.BAD_REQUEST,
  })
  readonly httpStatus: HttpStatus;

  @ApiProperty({
    default: ErrorCode.INVALID_TOKEN,
  })
  readonly errorCode: ErrorCode;

  constructor(errorMsg: string) {
    super(HttpStatus.BAD_REQUEST, ErrorCode.INVALID_TOKEN, errorMsg);
  }
}

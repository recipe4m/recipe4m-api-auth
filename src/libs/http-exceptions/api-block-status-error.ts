import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { ApiError } from './api-error';
import { ErrorCode } from './error-code';
import { HttpStatus } from '@nestjs/common';

@ApiExtraModels()
export class ApiBlockStatusError extends ApiError {
  @ApiProperty({
    default: HttpStatus.FORBIDDEN,
  })
  readonly httpStatus: HttpStatus;

  @ApiProperty({
    default: ErrorCode.BLOCK_STATUS,
  })
  readonly errorCode: ErrorCode;

  constructor(errorMsg: string) {
    super(HttpStatus.FORBIDDEN, ErrorCode.BLOCK_STATUS, errorMsg);
  }
}

import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { ApiError } from './api-error';
import { ErrorCode } from './error-code';
import { HttpStatus } from '@nestjs/common';

@ApiExtraModels()
export class ApiNoPermissionError extends ApiError {
  @ApiProperty({
    default: HttpStatus.FORBIDDEN,
  })
  readonly httpStatus: HttpStatus;

  @ApiProperty({
    default: ErrorCode.NO_PERMISSION,
  })
  readonly errorCode: ErrorCode;

  constructor(errorMsg: string) {
    super(HttpStatus.FORBIDDEN, ErrorCode.NO_PERMISSION, errorMsg);
  }
}

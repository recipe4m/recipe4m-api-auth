import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { ApiError } from './api-error';
import { ErrorCode } from './error-code';
import { HttpStatus } from '@nestjs/common';

@ApiExtraModels()
export class ApiNotFoundError extends ApiError {
  @ApiProperty({
    default: HttpStatus.NOT_FOUND,
  })
  readonly httpStatus: HttpStatus;

  @ApiProperty({
    default: ErrorCode.NOT_FOUND,
  })
  readonly errorCode: ErrorCode;

  constructor(errorMsg: string) {
    super(HttpStatus.NOT_FOUND, ErrorCode.NOT_FOUND, errorMsg);
  }
}

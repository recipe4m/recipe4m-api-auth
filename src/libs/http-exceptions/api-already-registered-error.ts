import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { ApiError } from './api-error';
import { ErrorCode } from './error-code';
import { HttpStatus } from '@nestjs/common';

@ApiExtraModels()
export class ApiAlreadyRegisteredError extends ApiError {
  @ApiProperty({
    default: HttpStatus.CONFLICT,
  })
  readonly httpStatus: HttpStatus;

  @ApiProperty({
    default: ErrorCode.ALREADY_REGISTERED,
  })
  readonly errorCode: ErrorCode;

  constructor(errorMsg: string) {
    super(HttpStatus.CONFLICT, ErrorCode.ALREADY_REGISTERED, errorMsg);
  }
}

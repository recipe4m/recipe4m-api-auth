import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { ApiError } from './api-error';
import { ErrorCode } from './error-code';
import { HttpStatus } from '@nestjs/common';

@ApiExtraModels()
export class ApiDormantStatusError extends ApiError {
  @ApiProperty({
    default: HttpStatus.FORBIDDEN,
  })
  readonly httpStatus: HttpStatus;

  @ApiProperty({
    default: ErrorCode.DORMANT_STATUS,
  })
  readonly errorCode: ErrorCode;

  constructor(errorMsg: string) {
    super(HttpStatus.FORBIDDEN, ErrorCode.DORMANT_STATUS, errorMsg);
  }
}

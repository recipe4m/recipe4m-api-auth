import {
  ApiExtraModels,
  ApiProperty,
  ApiResponse,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';

import { ErrorCode } from './error-code';
import { HttpStatus } from '@nestjs/common';

@ApiExtraModels()
export class ApiError {
  @ApiProperty()
  readonly httpStatus: HttpStatus;

  @ApiProperty()
  readonly errorCode: ErrorCode;

  @ApiProperty()
  readonly errorMsg: string;

  constructor(httpStatus: number, errorCode: number, errorMsg: string) {
    this.httpStatus = httpStatus;
    this.errorCode = errorCode;
    this.errorMsg = errorMsg;
  }

  get description() {
    return JSON.stringify(
      {
        httpStatus: this.httpStatus,
        errorCode: this.errorCode,
        errorMsg: this.errorMsg,
      },
      null,
      2,
    );
  }

  get options(): ApiResponseOptions {
    return {
      status: this.errorCode,
      description: this.description,
      schema: { $ref: getSchemaPath(this.constructor.name) },
    };
  }

  response() {
    return ApiResponse(this.options);
  }
}

import { ApiAlreadyRegisteredError } from '@http-exceptions/api-already-registered-error';
import { ApiBlockStatusError } from '@http-exceptions/api-block-status-error';
import { ApiDormantStatusError } from '@http-exceptions/api-dormant-status-error';
import { ApiExpiredTokenError } from '@http-exceptions/api-expired-token-error';
import { ApiForbiddenError } from '@http-exceptions/api-forbidden-error';
import { ApiInvalidTokenError } from '@http-exceptions/api-invalid-token-error';
import { ApiNoPermissionError } from '@http-exceptions/api-no-permission-error';
import { ApiNotFoundError } from '@http-exceptions/api-not-found-error';
import { ApiPostAuthRefreshResData } from '@auth/schemas/api-post-auth-refresh-res-data.schema';
import { ApiPostAuthSignInResData } from '@auth/schemas/api-post-auth-sign-in-res-data.schema';
import { ApiPostAuthSignUpResData } from '@auth/schemas/api-post-auth-sign-up-res-data.schema';
import { ApiUnauthorizedError } from '@http-exceptions/api-unauthorized-error';

export default [
  /**
   * Auth
   */
  ApiPostAuthSignInResData,
  ApiPostAuthSignUpResData,
  ApiPostAuthRefreshResData,
  /**
   * ApiError
   */
  ApiAlreadyRegisteredError,
  ApiBlockStatusError,
  ApiDormantStatusError,
  ApiExpiredTokenError,
  ApiForbiddenError,
  ApiInvalidTokenError,
  ApiNoPermissionError,
  ApiNotFoundError,
  ApiUnauthorizedError,
];

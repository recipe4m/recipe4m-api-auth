import { HttpExceptionFilter } from '@libs/filters/http-exception.filter';
import { SwaggerTag } from '@libs/swaggers/swagger-tag';
import { Body, Controller, Patch, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RefreshDto } from './dto/refresh.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignOutDto } from './dto/sign-out.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiPostAuthRefreshResData } from './schemas/api-post-auth-refresh-res-data.schema';
import { ApiPostAuthSignInResData } from './schemas/api-post-auth-sign-in-res-data.schema';
import { ApiPostAuthSignUpResData } from './schemas/api-post-auth-sign-up-res-data.schema';
import { TokenService } from './token.service';

@Controller('auth')
@ApiTags(SwaggerTag.Authentication)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(ApiPostAuthSignInResData) },
  })
  @TokenService.ErrorInvalidToken.response()
  @HttpExceptionFilter.ErrorBlockStatus.response()
  @HttpExceptionFilter.ErrorDormantStatus.response()
  @AuthService.ErrorNotFoundUser.response()
  async signIn(
    @Body() signInDto: SignInDto,
  ): Promise<ApiPostAuthSignInResData> {
    return await this.authService.signIn(signInDto);
  }

  @Post('sign-up')
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(ApiPostAuthSignUpResData) },
  })
  @TokenService.ErrorInvalidToken.response()
  @AuthService.ErrorAlreadyRegistered.response()
  async signUp(
    @Body() signUpDto: SignUpDto,
  ): Promise<ApiPostAuthSignUpResData> {
    return await this.authService.signUp(signUpDto);
  }

  @Patch('sign-out')
  @ApiOkResponse()
  @TokenService.ErrorInvalidToken.response()
  async signOut(@Body() signOutDto: SignOutDto): Promise<null> {
    return await this.authService.signOut(signOutDto);
  }

  @Post('refresh')
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(ApiPostAuthRefreshResData) },
  })
  @TokenService.ErrorInvalidToken.response()
  @AuthService.ErrorNotFoundUser.response()
  @HttpExceptionFilter.ErrorBlockStatus.response()
  @HttpExceptionFilter.ErrorDormantStatus.response()
  async refresh(
    @Body() refreshDto: RefreshDto,
  ): Promise<ApiPostAuthRefreshResData> {
    return await this.authService.refresh(refreshDto);
  }
}

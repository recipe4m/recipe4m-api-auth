import { Body, Controller, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '@auth/auth.service';
import { SignInDto } from '@auth/dto/sign-in.dto';
import { SignUpDto } from '@auth/dto/sign-up.dto';
import { SwaggerTag } from './libs/swaggers/swagger-tag';
import { SignOutDto } from './auth/dto/sign-out.dto';
import { RefreshDto } from './auth/dto/refresh.dto';

@Controller()
@ApiTags(SwaggerTag.Authentication)
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-out')
  async signOut(@Body() signOutDto: SignOutDto) {
    return this.authService.signOut(signOutDto);
  }

  @Post('refresh')
  async refresh(@Body() refreshDto: RefreshDto) {
    return this.authService.refresh(refreshDto);
  }
}

import { AuthService } from './auth.service';
import { GoogleOAuthService } from './google-o-auth.service';
import { Module } from '@nestjs/common';
import { OAuthService } from './o-auth.service';
import { PrismaService } from '@src/prisma/prisma.service';

@Module({
  providers: [AuthService, PrismaService, OAuthService, GoogleOAuthService],
  exports: [AuthService],
})
export class AuthModule {}

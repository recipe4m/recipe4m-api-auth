import { AuthService } from './auth.service';
import { GoogleOAuthService } from './google-o-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { OAuthService } from './o-auth.service';
import { PrismaService } from '@src/prisma/prisma.service';
import { TokenService } from './token.service';

export const DynamicJwtModule = JwtModule.register({
  signOptions: {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  },
});

@Module({
  imports: [DynamicJwtModule],
  providers: [
    AuthService,
    PrismaService,
    OAuthService,
    GoogleOAuthService,
    TokenService,
  ],
  exports: [AuthService],
})
export class AuthModule {}

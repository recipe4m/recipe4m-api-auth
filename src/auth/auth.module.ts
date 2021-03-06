import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleOAuthService } from './google-o-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@libs/strategies/jwt.strategy';
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
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    OAuthService,
    GoogleOAuthService,
    TokenService,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}

import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { OAuthService } from '@src/o-auth/o-auth.service';
import { PrismaService } from '@src/prisma/prisma.service';

@Module({
  providers: [AuthService, PrismaService, OAuthService],
  exports: [AuthService],
})
export class AuthModule {}

import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';

@Module({
  providers: [AuthService, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}

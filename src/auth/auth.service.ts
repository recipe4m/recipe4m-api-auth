import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { RefreshDto } from './dto/refresh.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignOutDto } from './dto/sign-out.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signIn(signInDto: SignInDto) {
    return null;
  }

  async signUp(signUpDto: SignUpDto) {
    return null;
  }

  async signOut(signOutDto: SignOutDto) {
    return null;
  }

  async refresh(refreshDto: RefreshDto) {
    return null;
  }
}

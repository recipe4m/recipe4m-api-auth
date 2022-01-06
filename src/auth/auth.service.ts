import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { OAuthService } from '@src/o-auth/o-auth.service';
import { PrismaService } from '@src/prisma/prisma.service';
import { RefreshDto } from './dto/refresh.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignOutDto } from './dto/sign-out.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly oAuthService: OAuthService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const payload = await this.oAuthService.verifyToken(signInDto);

    if (!payload) throw new BadRequestException();

    const { user } = await this.prismaService.authInfo.findFirst({
      where: { ...signInDto },
      orderBy: { id: 'desc' },
      include: {
        user: true,
      },
    });

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

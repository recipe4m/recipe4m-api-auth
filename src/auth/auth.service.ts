import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ApiNotFoundError } from '@src/libs/http-exceptions/api-not-found-error';
import { HttpExceptionFilter } from '@filters/http-exception.filter';
import { OAuthService } from './o-auth.service';
import { PrismaService } from '@src/prisma/prisma.service';
import { RefreshDto } from './dto/refresh.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignOutDto } from './dto/sign-out.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  static ErrorNotFoundUser = new ApiNotFoundError('사용자를 찾을 수 없습니다.');

  constructor(
    private readonly prismaService: PrismaService,
    private readonly oAuthService: OAuthService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const payload = await this.oAuthService.verifyToken(signInDto);

    if (!payload) throw new BadRequestException();

    const { user } = await this.prismaService.authInfo.findFirst({
      select: { user: true },
      where: { ...signInDto },
      orderBy: { id: 'desc' },
    });

    if (!user) {
      throw new NotFoundException(AuthService.ErrorNotFoundUser);
    } else if (user.status === 'BLOCK') {
      throw new ForbiddenException(HttpExceptionFilter.ErrorBlockStatus);
    } else if (user.status === 'DORMANT') {
      throw new ForbiddenException(HttpExceptionFilter.ErrorBlockStatus);
    }

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

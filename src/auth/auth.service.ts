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
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  static ErrorNotFoundUser = new ApiNotFoundError('사용자를 찾을 수 없습니다.');

  constructor(
    private readonly prismaService: PrismaService,
    private readonly oAuthService: OAuthService,
    private readonly tokenService: TokenService,
  ) {}

  async signIn(signInDto: SignInDto) {
    try {
      const payload = await this.oAuthService.verifyToken(signInDto);

      if (!payload)
        throw new BadRequestException(TokenService.ErrorInvalidToken);

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

      return await this.tokenService.issueTokens({ userId: user.id });
    } catch (error) {
      throw error;
    }
  }

  async signUp(signUpDto: SignUpDto) {
    return null;
  }

  async signOut({ refreshToken }: SignOutDto) {
    try {
      const { sub: id } = await this.tokenService.verify(refreshToken);

      if (!id) throw new BadRequestException(TokenService.ErrorInvalidToken);

      await this.tokenService.setDisableRefreshToken(id);

      return null;
    } catch (error) {
      throw error;
    }
  }

  async refresh({ refreshToken }: RefreshDto) {
    try {
      const { sub: id } = await this.tokenService.verify(refreshToken);

      if (!id) throw new BadRequestException(TokenService.ErrorInvalidToken);

      const { userId, isUsed } =
        await this.prismaService.refreshToken.findUnique({
          select: { userId: true, isUsed: true },
          where: { id },
        });

      if (isUsed) throw new BadRequestException(TokenService.ErrorInvalidToken);

      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException(AuthService.ErrorNotFoundUser);
      } else if (user.status === 'BLOCK') {
        throw new ForbiddenException(HttpExceptionFilter.ErrorBlockStatus);
      } else if (user.status === 'DORMANT') {
        throw new ForbiddenException(HttpExceptionFilter.ErrorDormantStatus);
      }

      return await this.tokenService.reissueTokens({
        userId: user.id,
        refreshTokenId: id,
      });
    } catch (error) {
      throw error;
    }
  }
}

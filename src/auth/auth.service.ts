import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ApiAlreadyRegisteredError } from '@http-exceptions/api-already-registered-error';
import { ApiNotFoundError } from '@src/libs/http-exceptions/api-not-found-error';
import { HttpExceptionFilter } from '@libs/filters/http-exception.filter';
import { OAuthService } from './o-auth.service';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import { RefreshDto } from './dto/refresh.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignOutDto } from './dto/sign-out.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  static ErrorNotFoundUser = new ApiNotFoundError('사용자를 찾을 수 없습니다.');
  static ErrorAlreadyRegistered = new ApiAlreadyRegisteredError(
    '이미 등록된 회원입니다.',
  );

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

      const { provider } = signInDto;
      const oAuthId = payload.sub;

      const auth = await this.prismaService.auth.findFirst({
        select: { user: true },
        where: { provider, oAuthId },
        orderBy: { id: 'desc' },
      });

      if (!auth) throw new NotFoundException(AuthService.ErrorNotFoundUser);

      const { user } = auth;

      if (user.status === 'BLOCK') {
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
    try {
      const payload = await this.oAuthService.verifyToken(signUpDto);

      if (!payload)
        throw new BadRequestException(TokenService.ErrorInvalidToken);

      const { provider } = signUpDto;
      const oAuthId = payload.sub;
      const name = payload.name || '';
      const profileImageUrl = payload.picture || '';

      const user = await this.prismaService.user.create({
        select: { id: true },
        data: {
          name,
          profileImageUrl,
          authInfo: { create: [{ provider, oAuthId }] },
        },
      });

      return await this.tokenService.issueTokens({ userId: user.id });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(AuthService.ErrorAlreadyRegistered);
        }
      }
      throw error;
    }
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

import { Injectable, OnModuleInit } from '@nestjs/common';

import { AccessTokenPayload } from './interfaces/access-token-payload.dto';
import { ApiInvalidTokenError } from '@http-exceptions/api-invalid-token-error';
import { IssueAccessTokenParams } from './interfaces/issue-access-token-params';
import { IssueRefreshTokenParams } from './interfaces/issue-refresh-token-params';
import { IssueTokensParams } from './interfaces/issue-tokens-params';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma/prisma.service';
import { RefreshTokenPayload } from './interfaces/refresh-token-payload';
import { ReissueTokensParams } from './interfaces/reissue-tokens-params';

@Injectable()
export class TokenService implements OnModuleInit {
  static ErrorInvalidToken = new ApiInvalidTokenError(
    '유효하지 않은 토큰입니다.',
  );

  iss: string;
  refreshTokenExpiresIn: string;
  jwtSecret: string;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  onModuleInit() {
    this.iss = process.env.ISS;
    this.refreshTokenExpiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN;
    this.jwtSecret = process.env.JWT_SECRET;
  }

  issueAccessToken({ userId }: IssueAccessTokenParams) {
    const payload: AccessTokenPayload = {
      iss: this.iss,
      aud: userId,
    };

    return this.jwtService.sign(payload, { secret: this.jwtSecret });
  }

  async issueRefreshToken({ userId }: IssueRefreshTokenParams) {
    try {
      const { id } = await this.prismaService.refreshToken.create({
        select: { id: true },
        data: { userId },
      });

      const payload: RefreshTokenPayload = {
        iss: this.iss,
        sub: id,
      };

      return this.jwtService.sign(payload, {
        secret: this.jwtSecret,
        expiresIn: this.refreshTokenExpiresIn,
      });
    } catch (error) {
      throw error;
    }
  }

  async issueTokens({ userId }: IssueTokensParams) {
    try {
      return {
        accessToken: this.issueAccessToken({ userId }),
        refresToken: await this.issueRefreshToken({ userId }),
      };
    } catch (error) {
      throw error;
    }
  }

  async reissueTokens({ userId, refreshTokenId }: ReissueTokensParams) {
    try {
      await this.setDisableRefreshToken(refreshTokenId);
      return await this.issueTokens({ userId });
    } catch (error) {
      throw error;
    }
  }

  async verify<T extends Record<string, unknown> = any>(
    token: string,
  ): Promise<T> {
    return await this.jwtService.verifyAsync<T>(token, {
      secret: this.jwtSecret,
    });
  }

  async setDisableRefreshToken(id: number) {
    try {
      await this.prismaService.refreshToken.update({
        data: { isUsed: true },
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}

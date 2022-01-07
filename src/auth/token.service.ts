import { Injectable, OnModuleInit } from '@nestjs/common';

import { IssueAccessTokenParams } from './interfaces/issue-access-token-params';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService implements OnModuleInit {
  iss: string;
  refreshExpiresIn: string;
  jwtSecret: string;

  constructor(private readonly jwtService: JwtService) {}

  onModuleInit() {
    this.iss = process.env.ISS;
    this.refreshExpiresIn = process.env.REFRESH_EXPIRES_IN;
    this.jwtSecret = process.env.JWT_SECRET;
  }

  issueAccessToken({ id }: IssueAccessTokenParams) {
    const payload = {
      iss: this.iss,
      aud: id,
    };

    return this.jwtService.sign(payload, { secret: this.jwtSecret });
  }

  async issueRefreshToken() {
    return null;
  }

  async issueTokens() {
    return null;
  }
}

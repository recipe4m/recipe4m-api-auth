import { Injectable, OnModuleInit } from '@nestjs/common';
import { OAuth2Client, TokenPayload } from 'google-auth-library';

import { VerifyTokenArgs } from './interfaces/verify-token-args';
import e from 'express';

@Injectable()
export class OAuthService implements OnModuleInit {
  static ISS = 'https://accounts.google.com';

  oAuthGoogleClientId: string;
  oAuthGoogleClient: OAuth2Client;

  onModuleInit() {
    this.oAuthGoogleClientId = process.env.O_AUTH_GOOGLE_CLIENT_ID;
    this.oAuthGoogleClient = new OAuth2Client(this.oAuthGoogleClientId);
  }

  async validateGooglePayload({ iss, aud }: TokenPayload) {
    return iss === OAuthService.ISS && aud === this.oAuthGoogleClientId;
  }

  async verifyGoogleIdToken(idToken: string) {
    try {
      const ticket = await this.oAuthGoogleClient.verifyIdToken({
        idToken,
        audience: this.oAuthGoogleClientId,
      });

      const payload = ticket.getPayload();

      return this.validateGooglePayload(payload) ? payload : null;
    } catch (error) {
      return null;
    }
  }

  async verifyToken({ provider, token }: VerifyTokenArgs) {
    if (provider === 'GOOGLE') {
      return this.verifyGoogleIdToken(token);
    } else if (provider === 'APPLE') {
      // TODO verify apple token
    } else {
      return null;
    }
  }
}

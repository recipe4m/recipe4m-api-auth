import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { OAuth2Client, TokenPayload } from 'google-auth-library';

@Injectable()
export class GoogleOAuthService implements OnModuleInit {
  static ISS = 'https://accounts.google.com';

  logger = new Logger('GoogleOAuthService');
  oAuthGoogleClientId: string;
  oAuthGoogleClient: OAuth2Client;

  onModuleInit() {
    this.oAuthGoogleClientId = process.env.O_AUTH_GOOGLE_CLIENT_ID;
    this.oAuthGoogleClient = new OAuth2Client(this.oAuthGoogleClientId);
  }

  async validatePayload({ iss, aud }: TokenPayload) {
    return iss === GoogleOAuthService.ISS && aud === this.oAuthGoogleClientId;
  }

  async verifyIdToken(idToken: string) {
    try {
      const ticket = await this.oAuthGoogleClient.verifyIdToken({
        idToken,
        audience: this.oAuthGoogleClientId,
      });

      const payload = ticket.getPayload();

      return this.validatePayload(payload) ? payload : null;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }
}

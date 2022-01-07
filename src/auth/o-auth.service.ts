import { GoogleOAuthService } from './google-o-auth.service';
import { Injectable } from '@nestjs/common';
import { VerifyTokenArgs } from './interfaces/verify-token-args';

@Injectable()
export class OAuthService {
  constructor(private readonly googleOAuthService: GoogleOAuthService) {}

  async verifyToken({ provider, token }: VerifyTokenArgs) {
    if (provider === 'GOOGLE') {
      return this.googleOAuthService.verifyIdToken(token);
    } else if (provider === 'APPLE') {
      // TODO verify apple token
      throw new Error('TODO verify apple token');
    } else {
      return null;
    }
  }
}

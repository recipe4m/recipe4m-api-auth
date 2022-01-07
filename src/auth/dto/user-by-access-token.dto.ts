import { AccessTokenPayload } from '@auth/interfaces/access-token-payload.dto';

export class UserByAccessTokenDto {
  private aud: number;

  constructor({ aud }: AccessTokenPayload) {
    this.aud = aud;
  }

  get id() {
    return this.aud;
  }
}

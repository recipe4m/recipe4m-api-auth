import { ApiProperty } from '@nestjs/swagger';

export class TokensDto {
  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  accessToken: string;
}

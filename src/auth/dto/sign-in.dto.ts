import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    enum: ['GOOGLE', 'APPLE'],
  })
  provider: 'GOOGLE' | 'APPLE';

  @ApiProperty()
  token: string;
}

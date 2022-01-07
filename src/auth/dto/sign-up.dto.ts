import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    enum: ['GOOGLE', 'APPLE'],
  })
  provider: 'GOOGLE' | 'APPLE';

  @ApiProperty()
  token: string;
}

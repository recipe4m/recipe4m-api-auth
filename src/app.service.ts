import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  async getHello(): Promise<string> {
    await this.prismaService.user.create({
      data: {
        name: 'testName',
        profileImageUrl: 'TestProfileImageUrl',
        email: 'Test@email.com',
      },
    });

    return 'Hello World!';
  }
}

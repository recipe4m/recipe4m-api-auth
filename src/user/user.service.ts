import { Injectable, NotFoundException } from '@nestjs/common';

import { ApiNotFoundError } from '@http-exceptions/api-not-found-error';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  static ErrorNotFound = new ApiNotFoundError('해당 유저를 찾을 수 없습니다.');

  constructor(private readonly prismaService: PrismaService) {}

  async findOneById(id: number) {
    try {
      const user = await this.prismaService.user.findUnique({
        select: {
          id: true,
          name: true,
          profileImageUrl: true,
          email: true,
          bio: true,
          birthday: true,
          gender: true,
        },
        where: { id },
      });

      if (!user) throw new NotFoundException(UserService.ErrorNotFound);

      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateOwnProfile(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.prismaService.user.update({
        select: {
          id: true,
          name: true,
          profileImageUrl: true,
          email: true,
          bio: true,
          birthday: true,
          gender: true,
        },
        data: updateUserDto,
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundException(UserService.ErrorNotFound);
      }
      throw error;
    }
  }
}

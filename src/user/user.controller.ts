import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerTag } from '@libs/swaggers/swagger-tag';
import { JwtAuthGuard } from '@libs/guards/jwt-auth.guard';
import { Request } from 'express';
import { UserByAccessTokenDto } from '@auth/dto/user-by-access-token.dto';

@ApiTags(SwaggerTag.User)
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getOwnProfile(@Req() req: Request) {
    const { id } = req.user as UserByAccessTokenDto;
    return this.userService.findOneById(id);
  }

  @Get(':id')
  async getProfile(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneById(id);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async updateOwnProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateOwnProfile(id, updateUserDto);
  }
}

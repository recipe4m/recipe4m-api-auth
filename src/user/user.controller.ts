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
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { SwaggerTag } from '@libs/swaggers/swagger-tag';
import { JwtAuthGuard } from '@libs/guards/jwt-auth.guard';
import { Request } from 'express';
import { UserByAccessTokenDto } from '@auth/dto/user-by-access-token.dto';
import { ApiGetUserResData } from './schemas/api-get-user-res-data.schema';
import { ApiGetUserIdResData } from './schemas/api-get-user-id-res-data.schema';
import { ApiPatchUserResData } from './schemas/api-patch-user-res-data.schema';
import { HttpExceptionFilter } from '@libs/filters/http-exception.filter';

@ApiTags(SwaggerTag.User)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ schema: { $ref: getSchemaPath(ApiGetUserResData) } })
  @HttpExceptionFilter.ErrorUnauthorized.response()
  @HttpExceptionFilter.ErrorExpiredToken.response()
  @UserService.ErrorNotFound.response()
  async getOwnProfile(@Req() req: Request): Promise<ApiGetUserResData> {
    const { id } = req.user as UserByAccessTokenDto;
    return this.userService.findOneById(id);
  }

  @Get(':id')
  @ApiOkResponse({ schema: { $ref: getSchemaPath(ApiGetUserIdResData) } })
  @UserService.ErrorNotFound.response()
  async getProfile(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiGetUserIdResData> {
    return this.userService.findOneById(id);
  }

  @Patch()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ schema: { $ref: getSchemaPath(ApiPatchUserResData) } })
  @HttpExceptionFilter.ErrorUnauthorized.response()
  @HttpExceptionFilter.ErrorExpiredToken.response()
  @UserService.ErrorNotFound.response()
  async updateOwnProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ApiPatchUserResData> {
    return this.userService.updateOwnProfile(id, updateUserDto);
  }
}

import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getOwnProfile() {
    return this.userService.findOneById(0);
  }

  @Get(':id')
  async getProfile(@Param('id') id: string) {
    return this.userService.findOneById(0);
  }

  @Patch(':id')
  async updateOwnProfile(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }
}

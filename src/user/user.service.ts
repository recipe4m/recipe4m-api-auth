import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  findOneById(id: number) {
    return null;
  }

  updateOwnProfile(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}

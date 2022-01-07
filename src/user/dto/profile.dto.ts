import { Gender } from '@prisma/client';

export class ProfileDto {
  id: number;
  name: string;
  profileImageUrl: string;
  email: string | null;
  bio: string | null;
  birthday: Date | null;
  gender: Gender | null;
}

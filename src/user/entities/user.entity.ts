import { Gender, UserStatus } from '@prisma/client';

export class User {
  id: number;
  name: string;
  profileImageUrl: string;
  email: string | null;
  bio: string | null;
  birthday: Date | null;
  gender: Gender | null;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

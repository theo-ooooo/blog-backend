import { IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  registerToken: string;

  @IsString()
  username: string;

  @IsString()
  profileName: string;

  @IsString()
  bio: string;
}

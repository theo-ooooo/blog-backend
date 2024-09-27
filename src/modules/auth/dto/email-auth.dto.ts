import { IsString } from 'class-validator';

export class EmailAuthDto {
  @IsString()
  email: string;
}

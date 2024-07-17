import { IsString } from 'class-validator';

export class AdminDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

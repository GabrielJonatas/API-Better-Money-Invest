import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateClientDto {
  @IsNotEmpty()
  @IsString()
  username: string;
}

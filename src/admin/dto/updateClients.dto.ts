import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateClientDto {
  /**
   * Client username
   */
  @IsNotEmpty()
  @IsString()
  username: string;
}

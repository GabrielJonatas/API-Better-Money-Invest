import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  /**
   * Client username
   */
  @IsNotEmpty()
  @IsString()
  username: string;

  /**
   * Client password
   */
  @MinLength(8, {
    message: 'Password must be at least 8 characters',
  })
  @MaxLength(15, {
    message: 'Password must be at most 15 characters ',
  })
  @IsString()
  password: string;
}

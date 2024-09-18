import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class PayloadDto {
  /**
   * Client or admin username
   */
  @IsNumber()
  @Expose()
  sub: number;

  /**
   * Client or admin username
   */
  @IsString()
  @Expose()
  username: string;
}

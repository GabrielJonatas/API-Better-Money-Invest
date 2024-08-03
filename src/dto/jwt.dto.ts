import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class PayloadDto {
  @IsNumber()
  @Expose()
  sub: number;

  @IsString()
  @Expose()
  username: string;
}

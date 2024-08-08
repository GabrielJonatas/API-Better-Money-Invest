import { IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  type: string;

  @IsString()
  symbol: string;

  @IsNumber()
  roi: number;
}

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber({}, { message: 'Price must be a decimal number' })
  price: number;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  symbol: string;

  @IsNumber({}, { message: 'ROI must be a decimal number' })
  roi: number;
}

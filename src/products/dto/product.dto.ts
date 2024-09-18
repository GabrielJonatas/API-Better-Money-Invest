import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  /**
   * The name of the investment
   */
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * The price of the investment
   */
  @IsNumber({}, { message: 'Price must be a decimal number' })
  price: number;

  /**
   * The type of the investment
   */
  @IsNotEmpty()
  @IsString()
  type: string;

  /**
   * The symbol of the investment
   */
  @IsNotEmpty()
  @IsString()
  symbol: string;

  /**
   * The return on investment (ROI)
   */
  @IsNumber({}, { message: 'ROI must be a decimal number' })
  roi: number;
}

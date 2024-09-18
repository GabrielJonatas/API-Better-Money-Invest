import { IsIn, IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateInvestDto {
  /**
   * Client username
   */
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * Type of investment: bond or share
   */
  @IsNotEmpty()
  @IsString()
  @IsIn(['bond', 'share'], {
    message: 'Type must be bond or share',
  })
  investmentType: string;

  /**
   * Number of assets that will be bought
   */
  @IsInt()
  @IsPositive()
  assets: number;
}

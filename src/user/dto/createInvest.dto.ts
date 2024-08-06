import { IsInt, IsPositive, IsString } from 'class-validator';

export class CreateInvestDto {
  @IsString()
  name: string;

  @IsString()
  investmentType: string;

  @IsInt()
  @IsPositive()
  assets: number;
}

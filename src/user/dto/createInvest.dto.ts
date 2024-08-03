import { IsInt, IsPositive, IsString } from 'class-validator';

export class CreateInvestDto {
  @IsString()
  name: string;

  investmentType: string;

  @IsInt()
  @IsPositive()
  assets: number;
}

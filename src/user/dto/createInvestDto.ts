import {
  IsDateString,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateInvestDto {
  @IsString()
  name: string;

  @IsInt()
  @IsPositive()
  assets: number;

  @IsDateString()
  buyDate: Date;

  @IsNumber()
  @IsPositive()
  amountInvested: number;
}

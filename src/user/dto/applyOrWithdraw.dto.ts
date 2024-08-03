import { IsNumber, IsPositive, IsString } from 'class-validator';

export class ApplyOrWithdraw {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  operation: string;
}

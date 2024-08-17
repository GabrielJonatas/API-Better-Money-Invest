import { IsNumber, IsPositive, IsString } from 'class-validator';

export class ApplyOrWithdrawDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  operation: string;
}

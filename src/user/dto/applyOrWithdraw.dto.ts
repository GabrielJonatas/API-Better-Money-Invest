import { IsIn, IsNumber, IsPositive, IsString } from 'class-validator';

export class ApplyOrWithdrawDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsIn(['withdraw', 'deposit'], {
    message: 'Operation must be of withdraw or deposit',
  })
  operation: string;
}

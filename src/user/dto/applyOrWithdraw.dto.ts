import { ApiTags } from '@nestjs/swagger';
import { IsIn, IsNumber, IsPositive, IsString } from 'class-validator';

@ApiTags('Models')
export class ApplyOrWithdrawDto {
  /**
   * The amount to be deposited or withdrawn
   */
  @IsNumber()
  @IsPositive()
  amount: number;

  /**
   * The type of the operation: deposit or withdraw
   */
  @IsString()
  @IsIn(['withdraw', 'deposit'], {
    message: 'Operation must be of withdraw or deposit',
  })
  operation: string;
}

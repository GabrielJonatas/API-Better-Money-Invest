import { IsIn, IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateInvestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['bond', 'share'], {
    message: 'Type must be bond or share',
  })
  investmentType: string;

  @IsInt()
  @IsPositive()
  assets: number;
}

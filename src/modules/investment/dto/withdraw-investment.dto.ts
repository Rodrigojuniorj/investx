import { IsNumber, IsString } from 'class-validator';

export class WithdrawInvestmentDto {
  @IsNumber()
  id: number;

  @IsNumber()
  initialAmount: number;

  @IsNumber()
  currentAmount: number;

  @IsNumber()
  expectedAmount: number;

  @IsString()
  investmentDate: string;

  @IsNumber()
  finalAmount: number;

  @IsString()
  status: string;

  withdraws: {
    id: number;
    amount: number;
    withdraw: number;
    createdAt: any;
  }[];
}

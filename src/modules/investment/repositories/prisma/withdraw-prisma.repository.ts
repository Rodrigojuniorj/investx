import { CacheRepository } from '@/cache/cache-repository';
import { PrismaService } from '@/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { WithdrawRepository } from '../withdraw.repository';
import { DateHelper } from '@/helpers/date.helper';
import { InvestmentWithdrawDto } from '../../dto/investment-withdraw.dto';

@Injectable()
export class WithdrawPrismaRepository implements WithdrawRepository {
  constructor(
    private prisma: PrismaService,
    private cache: CacheRepository,
  ) {}

  async withdrawFromInvestment(
    investmentId: number,
    amount: number,
    userId: number,
  ): Promise<InvestmentWithdrawDto> {
    const investment = await this.prisma.investment.findFirst({
      where: {
        id: investmentId,
        userId,
      },
      include: {
        withdraws: true,
      },
    });

    if (!investment) {
      throw new BadRequestException('Investimento não encontrado');
    }

    if (investment.status === 'ENCERRADO') {
      throw new BadRequestException(
        'Você já retirou todo o dinheiro desse investimento',
      );
    }

    if (
      amount <= 0 ||
      (amount > investment.finalAmount && investment.finalAmount > 0)
    ) {
      throw new BadRequestException('Valor da retirada inválido');
    }

    const imposto = this.calculateTax(investment.investmentDate, amount);
    const valorLiquido = amount - imposto;

    const withdraw = await this.prisma.withdraw.create({
      data: {
        investmentId: investmentId,
        amount: valorLiquido,
        withdraw: amount,
      },
      select: {
        id: true,
        amount: true,
        withdraw: true,
        createdAt: true,
      },
    });

    const updatedCurrentAmount = investment.currentAmount - amount;
    const updatedExpectedAmount = await this.calculateExpectedBalance({
      ...investment,
      currentAmount: updatedCurrentAmount,
    });

    const withdrawInvestment = await this.prisma.investment.findFirst({
      where: {
        id: investmentId,
        userId,
      },
      include: {
        withdraws: true,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { totalAmount, totalWithdrawal } = this.sumWithdraws(
      withdrawInvestment.withdraws,
    );

    const balanceWithInterest = updatedExpectedAmount - totalWithdrawal;

    await this.prisma.investment.update({
      where: { id: investmentId },
      data: {
        currentAmount: updatedCurrentAmount,
        expectedAmount: updatedExpectedAmount,
        status: balanceWithInterest === 0 ? 'ENCERRADO' : 'ATIVO',
        finalAmount: balanceWithInterest,
        updatedAt: new Date(),
      },
      select: {
        withdraws: true,
      },
    });

    await this.cache.invalidateCache(`user-query-${userId}-*`);

    return {
      withdraw: {
        ...withdraw,
        createdAt: DateHelper.convertUTCBrazilAndFormat(withdraw.createdAt),
      },
      remainingAmount: parseFloat(balanceWithInterest.toFixed(2)),
    };
  }

  private sumWithdraws(withdraws: any[]): {
    totalAmount: number;
    totalWithdrawal: number;
  } {
    return withdraws.reduce(
      (acc, withdraw) => {
        acc.totalAmount += withdraw.amount;
        acc.totalWithdrawal += withdraw.withdraw;
        return acc;
      },
      { totalAmount: 0, totalWithdrawal: 0 },
    );
  }

  private async calculateExpectedBalance(investment: any): Promise<number> {
    let currentAmount = investment.initialAmount;
    const withdraws = investment.withdraws;

    const investmentStartDate = DateHelper.convertUTCBrazil(
      investment.investmentDate,
    );
    const now = DateHelper.momentDate();

    for (
      let month = 0;
      month < now.diff(investmentStartDate, 'months');
      month++
    ) {
      currentAmount *= 1 + 0.0052;

      const withdrawalDate = investmentStartDate.clone().add(month, 'months');
      withdraws.forEach((withdraw) => {
        if (
          DateHelper.convertUTCBrazil(withdraw.createdAt).isSame(
            withdrawalDate,
            'month',
          )
        ) {
          currentAmount -= withdraw.amount;
        }
      });
    }

    const formattedExpectedBalance = parseFloat(currentAmount.toFixed(2));
    await this.prisma.investment.update({
      where: { id: investment.id },
      data: { expectedAmount: formattedExpectedBalance },
    });

    return formattedExpectedBalance;
  }

  private calculateTax(investmentDate: Date, amount: number): number {
    const months = this.calculateMonthsSince(investmentDate);

    if (months < 12) {
      return amount * 0.225;
    } else if (months < 24) {
      return amount * 0.185;
    } else {
      return amount * 0.15;
    }
  }

  private calculateMonthsSince(investmentDate: Date): number {
    const startDate = DateHelper.convertUTCBrazil(investmentDate);
    const now = DateHelper.momentDate();

    return now.diff(startDate, 'months');
  }
}

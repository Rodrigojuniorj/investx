import { CacheRepository } from '@/cache/cache-repository';
import { PrismaService } from '@/prisma/prisma.service';
import { InvestmentRepository } from '../investment.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InvestmentBodyDto } from '../../dto/investment-body.dto';
import { DateHelper } from '@/helpers/date.helper';
import { InvestmentResponseDto } from '../../dto/investment-response.dto';
import { InvestmentFilterDto } from '../../dto/investment-filter.dto';
import { generateCacheKey } from '@/commons/utils/generate-cache-key.util';
import { Prisma } from '@prisma/client';
import { PrismaHelper } from '@/helpers/prisma.helper';
import { WithdrawInvestmentDto } from '../../dto/withdraw-investment.dto';

@Injectable()
export class InvestmentPrismaRepository implements InvestmentRepository {
  constructor(
    private prisma: PrismaService,
    private cache: CacheRepository,
  ) {}

  async createInvestment(
    data: InvestmentBodyDto,
    userId: number,
  ): Promise<void> {
    const investment = await this.prisma.investment.create({
      data: {
        userId,
        initialAmount: data.initialAmount,
        currentAmount: data.initialAmount,
        status: 'ATIVO',
        expectedAmount: data.initialAmount,
        finalAmount: data.initialAmount,
        investmentDate: DateHelper.convetToDateBD(data.investmentDate),
      },
    });

    if (!investment) {
      throw new BadRequestException('Erro ao criar o investimento');
    }

    await this.cache.invalidateCache(`user-query-${userId}-*`);
  }

  async getInvestmentById(
    investmentId: number,
    userId: number,
  ): Promise<InvestmentResponseDto> {
    const investment = await this.prisma.investment.findFirst({
      where: {
        id: investmentId,
        userId,
      },
      include: {
        withdraws: {
          select: {
            id: true,
            amount: true,
            withdraw: true,
            createdAt: true,
          },
        },
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

    const balanceExpected = await this.calculateExpectedBalance(investment);
    const { totalAmount, totalWithdrawal } = this.sumWithdraws(
      investment.withdraws,
    );

    const balanceWithInterest = balanceExpected - totalWithdrawal;

    await this.cache.invalidateCache(`user-query-${userId}-*`);

    return {
      id: investment.id,
      initialAmount: parseFloat(investment.initialAmount.toFixed(2)),
      currentAmount: parseFloat(investment.currentAmount.toFixed(2)),
      investmentDate: DateHelper.convertUTCBrazilAndFormat(
        investment.investmentDate,
      ),
      balanceExpected,
      remainingAmount: parseFloat(balanceWithInterest.toFixed(2)),
      withdraw: {
        history: investment.withdraws.map((withdraw) => ({
          ...withdraw,
          createdAt: DateHelper.convertUTCBrazilAndFormat(withdraw.createdAt),
        })),
        totalWithdrawalAmount: totalWithdrawal,
        totalWithdrawalAmountWithDiscount: totalAmount,
      },
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

  async filterInvestment(query: InvestmentFilterDto, userId: number) {
    const cacheKey = generateCacheKey(`user-query-${userId}`, query);

    const cacheExists = await this.cache.get(cacheKey);
    if (cacheExists) {
      const cacheData = JSON.parse(cacheExists);
      return cacheData;
    }

    const where: Prisma.InvestmentWhereInput = {};
    const select: Prisma.InvestmentSelect = {
      id: true,
      initialAmount: true,
      currentAmount: true,
      expectedAmount: true,
      investmentDate: true,
      finalAmount: true,
      status: true,
      withdraws: {
        select: {
          id: true,
          amount: true,
          withdraw: true,
          createdAt: true,
        },
      },
    };

    if (query.status) {
      where.status = query.status;
    }

    where.userId = userId;

    const investments = await PrismaHelper.paginate<
      WithdrawInvestmentDto,
      Prisma.InvestmentWhereInput,
      Prisma.InvestmentSelect
    >(this.prisma.investment, where, select, {
      pageNumber: query.pageNumber,
      pageSize: query.pageSize,
    });

    const investmentsArray = await Promise.all(
      investments.content.map(async (investment) => {
        const balanceExpected = await this.calculateExpectedBalance(investment);
        const { totalAmount, totalWithdrawal } = this.sumWithdraws(
          investment.withdraws,
        );

        const balanceWithInterest = balanceExpected - totalWithdrawal;

        return {
          id: investment.id,
          initialAmount: parseFloat(investment.initialAmount.toFixed(2)),
          currentAmount: parseFloat(investment.currentAmount.toFixed(2)),
          investmentDate: DateHelper.convertUTCBrazilAndFormat(
            new Date(investment.investmentDate),
          ),
          status: investment.status,
          balanceExpected,
          remainingAmount: parseFloat(balanceWithInterest.toFixed(2)),
          withdraws: {
            history: investment.withdraws.map((withdraw) => ({
              ...withdraw,
              createdAt: DateHelper.convertUTCBrazilAndFormat(
                new Date(withdraw.createdAt),
              ),
            })),
            totalWithdrawalAmount: totalWithdrawal,
            totalWithdrawalAmountWithDiscount: totalAmount,
          },
        };
      }),
    );

    const retrunArray = {
      content: investmentsArray,
      numberOfElements: investments.numberOfElements,
      pageNumber: investments.pageNumber,
      pageSize: investments.pageSize,
      totalElements: investments.totalElements,
      totalPages: investments.totalPages,
    };

    await this.cache.set(cacheKey, JSON.stringify(retrunArray));

    return retrunArray;
  }
}

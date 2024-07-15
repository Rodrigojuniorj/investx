type TPaginationParams = {
  pageNumber?: number;
  pageSize?: number;
};

type PrismaModelDelegate<T, S> = {
  findMany: (args: {
    where?: T;
    select?: S;
    skip?: number;
    take?: number;
    orderBy?: { [key: string]: 'desc' | 'asc' }[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) => Promise<any[]>;
  count: (args: { where?: T }) => Promise<number>;
};

export class PrismaHelper {
  static async paginate<T, W, S>(
    model: PrismaModelDelegate<W, S>,
    where: W,
    select: S,
    params: TPaginationParams,
  ): Promise<{
    content: T[];
    numberOfElements: number;
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  }> {
    const pageNumber = params.pageNumber || 1;
    const pageSize = params.pageSize || 10;

    const orderBy: { [key: string]: 'desc' | 'asc' }[] = [
      { createdAt: 'desc' },
    ];

    const [result, totalElements] = await Promise.all([
      model.findMany({
        where,
        select,
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        orderBy,
      }),
      model.count({ where }),
    ]);

    const totalPages = Math.ceil(totalElements / pageSize);

    return {
      content: result,
      numberOfElements: result.length,
      pageNumber,
      pageSize,
      totalElements,
      totalPages,
    };
  }
}

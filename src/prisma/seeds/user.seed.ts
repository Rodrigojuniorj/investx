import type { PrismaClient } from '@prisma/client';
import { generateHash } from '../../commons/utils/generate-hash.util';

export async function userSeed(prisma: PrismaClient) {
  const password = await generateHash('rodrigo123@');

  await prisma.user.create({
    data: {
      name: 'Rodrigo Tavares',
      email: 'rodrigotavaresfranco@gmail.com',
      hash: password,
      role: 'ADMINISTRATOR',
    },
  });
}

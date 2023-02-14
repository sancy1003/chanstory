// import { PrismaClient } from '@prisma/client';

// declare global {
//   var client: PrismaClient | undefined;
// }

// const client = global.client || new PrismaClient();

// if (process.env.NODE_ENV === 'development') global.client = client;

// export default client;

import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const client =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = client;

export default client;

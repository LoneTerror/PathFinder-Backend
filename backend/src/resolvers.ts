// backend/src/resolvers.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    getAllUsers: async () => {
      // This tells Prisma to go find all users in the database
      return await prisma.user.findMany();
    },
  },
};
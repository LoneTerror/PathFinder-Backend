import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userResolvers = {
  Query: {
    getAllUsers: () =>
      prisma.user.findMany({
        include: {
          skills: { include: { skill: true } },
          recommendations: { include: { career: true } },
        },
      }),

    getUserById: (_: any, { id }: { id: string }) =>
      prisma.user.findUnique({
        where: { id },
        include: {
          skills: { include: { skill: true } },
          recommendations: { include: { career: true } },
        },
      }),
  },

  Mutation: {
    createUser: (_: any, args: any) => prisma.user.create({ data: args }),
  },
};

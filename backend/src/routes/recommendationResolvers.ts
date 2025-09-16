import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const recommendationResolvers = {
  Query: {
    getRecommendations: (_: any, { userId }: { userId: string }) =>
      prisma.recommendation.findMany({
        where: { userId },
        include: { career: true },
      }),
  },
  Mutation: {
    recommendCareer: (_: any, args: any) =>
      prisma.recommendation.create({ data: args }),
  },
};

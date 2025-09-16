import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const careerResolvers = {
  Query: {
    getCareerPaths: () => prisma.careerPath.findMany(),
  },
  Mutation: {
    addCareerPath: (_: any, args: any) =>
      prisma.careerPath.create({ data: args }),
  },
};

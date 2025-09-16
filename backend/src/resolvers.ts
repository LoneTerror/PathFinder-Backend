// backend/src/resolvers.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    getAllUsers: () =>
      prisma.user.findMany({
        include: {
          skills: { include: { skill: true } },
          recommendations: { include: { career: true } },
        },
      }),

    getUser: (_: any, { id }: { id: string }) =>
      prisma.user.findUnique({
        where: { id },
        include: {
          skills: { include: { skill: true } },
          recommendations: { include: { career: true } },
        },
      }),

    getSkills: () => prisma.skill.findMany(),
    getCareerPaths: () => prisma.careerPath.findMany(),
    getRecommendations: (_: any, { userId }: { userId: string }) =>
      prisma.recommendation.findMany({
        where: { userId },
        include: { career: true },
      }),
  },

  Mutation: {
    addUser: (_: any, args: any) => prisma.user.create({ data: args }),
    addSkill: (_: any, args: any) => prisma.skill.create({ data: args }),
    addUserSkill: (_: any, args: any) =>
      prisma.userSkill.create({
        data: {
          userId: args.userId,
          skillId: args.skillId,
          level: args.level,
        },
      }),
    addCareerPath: (_: any, args: any) => prisma.careerPath.create({ data: args }),
    recommendCareer: (_: any, args: any) =>
      prisma.recommendation.create({
        data: {
          userId: args.userId,
          careerId: args.careerId,
          message: args.message,
        },
      }),
  },
};

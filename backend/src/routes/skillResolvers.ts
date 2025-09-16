import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const skillResolvers = {
  Query: {
    getSkills: () => prisma.skill.findMany(),
  },
  Mutation: {
    addSkill: (_: any, args: any) => prisma.skill.create({ data: args }),
  },
};

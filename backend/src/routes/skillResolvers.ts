import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const skillResolvers = {
  Query: {
    getSkills: () => prisma.skill.findMany(),
    
    // --- ADD THIS NEW RESOLVER ---
    getSkillByName: (_: any, { name }: { name: string }) => {
      return prisma.skill.findUnique({
        where: { name },
        include: {
          relatedRoles: true,
          courses: true,
        },
      });
    },
  },
  Mutation: {
    addSkill: (_: any, args: any) => prisma.skill.create({ data: args }),
  },
};

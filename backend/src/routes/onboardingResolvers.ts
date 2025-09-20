// File: backend/src/onboardingResolvers.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const onboardingResolvers = {
  Mutation: {
    // --- SKILLS & EXPERTISE MUTATIONS ---
    addUserSkill: (_: any, { userId, skillId, level }: { userId: string; skillId: string; level: string }) => {
      return prisma.userSkill.create({
        data: {
          userId,
          skillId,
          level,
        },
      });
    },

    updateUserSkill: (_: any, { userSkillId, level }: { userSkillId: string; level: string }) => {
      return prisma.userSkill.update({
        where: { id: userSkillId },
        data: { level },
      });
    },

    removeUserSkill: (_: any, { userSkillId }: { userSkillId: string }) => {
      return prisma.userSkill.delete({
        where: { id: userSkillId },
      });
    },

    // --- CAREER GOALS MUTATIONS ---
    addUserCareerGoal: (_: any, { userId, careerPathId }: { userId: string; careerPathId: string }) => {
      return prisma.user.update({
        where: { id: userId },
        data: {
          careerGoals: {
            connect: { id: careerPathId },
          },
        },
      });
    },

    removeUserCareerGoal: (_: any, { userId, careerPathId }: { userId: string; careerPathId: string }) => {
      return prisma.user.update({
        where: { id: userId },
        data: {
          careerGoals: {
            disconnect: { id: careerPathId },
          },
        },
      });
    },

    // --- PROJECT MUTATIONS ---
    addProject: (_: any, { userId, name, description, githubLink }: { userId: string; name: string; description?: string; githubLink?: string }) => {
      return prisma.project.create({
        data: {
          userId,
          name,
          description,
          githubLink,
        },
      });
    },

    updateProject: (_: any, { projectId, name, description, githubLink }: { projectId: string; name?: string; description?: string; githubLink?: string }) => {
      return prisma.project.update({
        where: { id: projectId },
        data: {
          name,
          description,
          githubLink,
        },
      });
    },

    deleteProject: (_: any, { projectId }: { projectId: string }) => {
      return prisma.project.delete({
        where: { id: projectId },
      });
    },
  },
};
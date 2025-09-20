import { PrismaClient, ProjectStatus } from '@prisma/client';
import { GraphQLError } from 'graphql';

// Define a basic Context type. You might have this in a separate file.
interface Context {
  prisma: PrismaClient;
  // You would typically have an authenticated user's ID here
  // userId?: string; 
}

export const projectResolvers = {
  Mutation: {
    /**
     * Creates a new project for a specified user.
     */
    addProject: async (
      _: any,
      {
        userId,
        name,
        description,
        githubLink,
        status,
      }: {
        userId: string;
        name: string;
        description?: string;
        githubLink?: string;
        status?: ProjectStatus;
      },
      context: Context
    ) => {
      // Optional: In a real app, you'd verify that the logged-in user
      // has permission to add a project for this userId.
      
      const newProject = await context.prisma.project.create({
        data: {
          name,
          description,
          githubLink,
          status: status || ProjectStatus.ACTIVE, // Defaults to ACTIVE if not provided
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
      return newProject;
    },

    /**
     * Updates an existing project.
     */
    updateProject: async (
      _: any,
      {
        projectId,
        name,
        description,
        githubLink,
        status,
      }: {
        projectId: string;
        name?: string;
        description?: string;
        githubLink?: string;
        status?: ProjectStatus;
      },
      context: Context
    ) => {
      // Optional but recommended: Verify ownership before allowing an update.
      // const projectToUpdate = await context.prisma.project.findUnique({ where: { id: projectId } });
      // if (projectToUpdate?.userId !== context.userId) {
      //   throw new GraphQLError('You are not authorized to update this project.');
      // }

      const updatedProject = await context.prisma.project.update({
        where: {
          id: projectId,
        },
        data: {
          name,
          description,
          githubLink,
          status,
        },
      });

      if (!updatedProject) {
        throw new GraphQLError('Project not found.');
      }

      return updatedProject;
    },

    /**
     * Deletes a project by its ID.
     */
    deleteProject: async (
      _: any,
      { projectId }: { projectId: string },
      context: Context
    ) => {
      // Optional but recommended: Verify ownership before allowing a deletion.
      // const projectToDelete = await context.prisma.project.findUnique({ where: { id: projectId } });
      // if (projectToDelete?.userId !== context.userId) {
      //   throw new GraphQLError('You are not authorized to delete this project.');
      // }
      
      const deletedProject = await context.prisma.project.delete({
        where: {
          id: projectId,
        },
      });

      if (!deletedProject) {
        throw new GraphQLError('Project not found.');
      }
      
      return deletedProject;
    },
  },
};
// src/routes/chatResolvers.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const chatResolvers = {
  Query: {
    chatMessages: (parent: any, { userId }: { userId: string }) =>
      prisma.chatMessage.findMany({
        where: { userId },
        orderBy: { timestamp: "asc" },
      }),
  },
  Mutation: {
    saveChatMessages: (
      _: any,
      { userId, messages }: { userId: string; messages: any[] }
    ) =>
      prisma.chatMessage.createMany({
        data: messages.map((msg) => ({
          userId: userId,
          sender: msg.sender,
          text: msg.text,
        })),
      }).then(result => result.count) 
  },
};
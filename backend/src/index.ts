import 'dotenv/config'; // Make sure this is at the very top
import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library

const prisma = new PrismaClient();
// Ensure you have JWT_SECRET in your .env file
const JWT_SECRET = process.env.JWT_SECRET || 'JWTSECRETKEY';

// Define an interface for our context so TypeScript knows about userId
interface Context {
  prisma: PrismaClient;
  userId?: string; // userId will be available if the user is authenticated
}

const startServer = async () => {
  const app: Application = express();

  // 1. Connect to the database (This part is correct)
  try {
    await prisma.$connect();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('❌ Could not connect to the database.');
    console.error(error);
    process.exit(1);
  }

  // 2. Initialize Apollo Server with Authentication Context
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // This context function runs for every incoming GraphQL request
    context: ({ req }): Context => {
      // Get the Authorization header from the incoming request
      const authHeader = req.headers.authorization || '';

      if (authHeader) {
        // The token is usually sent as "Bearer [token]"
        const token = authHeader.replace('Bearer ', '');
        try {
          // Verify the token using your secret key
          const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
          // If the token is valid, add the decoded userId to the context
          return { prisma, userId: decoded.userId };
        } catch (err) {
          // This will catch invalid or expired tokens
          console.log('Invalid/Expired JWT');
        }
      }

      // If there's no token or it's invalid, return the context without a userId
      return { prisma };
    },
  });

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: 4001 }, () =>
    console.log(`🚀 Backend ready at http://localhost:4001${server.graphqlPath}`)
  );
};

startServer();
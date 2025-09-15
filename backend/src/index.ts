import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const startServer = async () => {
  const app: Application = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: 4001 }, () =>
    console.log(`🚀 Backend ready at http://localhost:4001${server.graphqlPath}`)
  );
};

startServer();
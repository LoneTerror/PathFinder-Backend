import express from 'express';
import cors from 'cors';
import { createHandler } from 'graphql-http/lib/use/express';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { typeDefs } from './typeDefs.js';
import { resolvers } from './resolvers.js';

const app = express();

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(
  '/graphql',
  cors(),
  express.json(),
  createHandler({ schema })
);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
});

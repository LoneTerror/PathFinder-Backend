import { userResolvers } from './routes/userResolvers';
import { skillResolvers } from './routes/skillResolvers';
import { careerResolvers } from './routes/careerResolvers';
import { recommendationResolvers } from './routes/recommendationResolvers';
import { authResolvers } from './routes/authResolvers'; // 1. Import the new auth resolvers

// This file merges all the separate resolver files into one.
export const resolvers = {
  Query: {
    // Spread all the query resolvers from each file
    ...userResolvers.Query,
    ...skillResolvers.Query,
    ...careerResolvers.Query,
    ...recommendationResolvers.Query,
  },
  Mutation: {
    // Spread all the mutation resolvers from each file
    ...userResolvers.Mutation,
    ...skillResolvers.Mutation,
    ...careerResolvers.Mutation,
    ...recommendationResolvers.Mutation,
    ...authResolvers.Mutation, // 2. Add the new auth mutations to the list
  },
};


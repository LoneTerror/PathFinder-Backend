import { userResolvers } from './routes/userResolvers';
import { skillResolvers } from './routes/skillResolvers';
import { careerResolvers } from './routes/careerResolvers';
import { recommendationResolvers } from './routes/recommendationResolvers';
import { authResolvers } from './routes/authResolvers'; 
import { onboardingResolvers } from './routes/onboardingResolvers';

// This file merges all the separate resolver files into one.
export const resolvers = {
  Query: {
    // Spread all the query resolvers from each file
    ...userResolvers.Query,
    ...skillResolvers.Query,
    ...careerResolvers.Query,
    ...recommendationResolvers.Query,
    // onboardingResolvers has no queries, so this line is removed.
  },
  Mutation: {
    // Spread all the mutation resolvers from each file
    ...userResolvers.Mutation,
    ...skillResolvers.Mutation,
    ...careerResolvers.Mutation,
    ...recommendationResolvers.Mutation,
    ...authResolvers.Mutation,
    ...onboardingResolvers.Mutation, // <-- ADD THIS LINE
  },
};
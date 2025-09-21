import { merge } from 'lodash';

// It looks like your resolvers are in a 'routes' folder, adjust if needed
import { userResolvers } from './routes/userResolvers';
import { skillResolvers } from './routes/skillResolvers';
import { careerResolvers } from './routes/careerResolvers';
import { recommendationResolvers } from './routes/recommendationResolvers';
import { authResolvers } from './routes/authResolvers'; 
import { onboardingResolvers } from './routes/onboardingResolvers';
import { projectResolvers } from './routes/projectResolvers';
import { chatResolvers } from './routes/chatResolvers';

// Merge all resolver objects into one. 
// This is robust and won't crash if a file is missing a Query or Mutation.
export const resolvers = merge(
  userResolvers,
  skillResolvers,
  careerResolvers,
  recommendationResolvers,
  authResolvers,
  onboardingResolvers,
  projectResolvers,
  chatResolvers
);
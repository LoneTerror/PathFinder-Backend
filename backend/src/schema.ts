// backend/src/schema.ts


import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
    currentRole: String
    yearsExperience: Int
    skills: [UserSkill]        # Relation
    recommendations: [Recommendation]
  }

  type Skill {
    id: ID!
    name: String!
    category: String
  }

  type UserSkill {
    id: ID!
    level: String
    skill: Skill
  }

  type CareerPath {
    id: ID!
    title: String!
    description: String
    demandLevel: String
    requiredSkills: [CareerSkill]
  }

  type CareerSkill {
    id: ID!
    importance: Int
    skill: Skill
  }

  type Recommendation {
    id: ID!
    message: String
    career: CareerPath
  }

  type Query {
    getAllUsers: [User]
    getUser(id: ID!): User
    getSkills: [Skill]
    getCareerPaths: [CareerPath]
    getRecommendations(userId: ID!): [Recommendation]
  }

  type Mutation {
    addUser(email: String!, name: String, currentRole: String, yearsExperience: Int): User
    addSkill(name: String!, category: String): Skill
    addUserSkill(userId: ID!, skillId: ID!, level: String): UserSkill
    addCareerPath(title: String!, description: String, demandLevel: String): CareerPath
    recommendCareer(userId: ID!, careerId: ID!, message: String): Recommendation
  }
`;

// src/typeDefs.js

// Using the gql tag is a standard way to write GraphQL schemas in a JavaScript file.
import { gql } from 'graphql-tag';

export const typeDefs = gql`
  # Represents a user of your application.
  type User {
    id: ID!
    email: String!
    name: String
    skills: [Skill!]
  }

  # Represents a specific skill, like "Kotlin" or "Product Management".
  type Skill {
    id: ID!
    name: String!
    category: SkillCategory!
  }
  
  # The output from your AI model.
  type Recommendation {
    id: ID!
    recommendedSkill: Skill
    reasoning: String!
  }

  enum SkillCategory {
    PROGRAMMING_LANGUAGE
    FRAMEWORK_LIBRARY
    SOFT_SKILL
  }

  # Defines all the "read" operations the client can perform.
  type Query {
    # Get a single user's profile by their ID.
    user(id: ID!): User
    
    # Get all available skills.
    skills: [Skill!]

    # The key query to fetch AI-powered recommendations for a user.
    getRecommendations(forUserId: ID!): [Recommendation!]
  }

  # Defines all the "write" or "update" operations.
  type Mutation {
    # Allows a user to update their list of skills.
    updateUserSkills(userId: ID!, skillIds: [ID!]!): User
  }
`;
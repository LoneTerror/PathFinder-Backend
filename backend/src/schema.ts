// backend/src/schema.ts
import gql from 'graphql-tag';
export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
    currentRole: String
    yearsExperience: Int
  }

  type Query {
    getAllUsers: [User]
  }
`;
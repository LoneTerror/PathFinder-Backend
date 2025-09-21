import gql from 'graphql-tag';

export const typeDefs = gql`
  # --- Enums ---
  enum Gender {
    MALE
    FEMALE
    OTHER
    PREFER_NOT_TO_SAY
  }

  enum ProjectStatus {
    ACTIVE
    COMPLETED
    ARCHIVED
  }

  # --- Object Types ---
  type AuthPayload {
    token: String!
    user: User!
  }
 
  type User {
    id: ID!
    email: String!
    name: String
    gender: Gender
    profileImageUrl: String
    phone: String
    birthday: String
    currentRole: String
    yearsExperience: Int
    highestQualification: String
    longTermGoal: String
    skills: [UserSkill]       
    careerGoals: [CareerPath]
    projects: [Project]
    recommendations: [Recommendation]
  }

  type Skill {
    id: ID!
    name: String!
    category: String
  }

  type Project {
    id: ID!
    name: String!
    description: String
    githubLink: String
    status: ProjectStatus!
    user: User!
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

  # --- Input Types ---
  input UpdateUserInput {
    name: String
    phone: String
    birthday: String
    gender: Gender
    profileImageUrl: String
    currentRole: String
    yearsExperience: Int
    highestQualification: String
    longTermGoal: String
  }

  # --- Queries & Mutations ---
  type Query {
    getAllUsers: [User]
    getUserById(id: ID!): User
    getSkills: [Skill]
    getCareerPaths: [CareerPath]
    getRecommendations(userId: ID!): [Recommendation]
    chatMessages(userId: ID!): [ChatMessage!]
  }

  type Mutation {
    register(email: String!, password: String!, name: String): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createUser(email: String!, name: String, currentRole: String, yearsExperience: Int): User
    addSkill(name: String!, category: String): Skill
    addCareerPath(title: String!, description: String, demandLevel: String): CareerPath
    recommendCareer(userId: ID!, careerId: ID!, message: String): Recommendation
    updateUser(id: ID!, data: UpdateUserInput!): User!
    deleteUser(id: ID!): User
    saveChatMessages(userId: ID!, messages: [ChatMessageInput!]!): [ChatMessage!]

    # For Skills & Expertise Screen
    addUserSkill(userId: ID!, skillId: ID!, level: String!): UserSkill!
    updateUserSkill(userSkillId: ID!, level: String!): UserSkill!
    removeUserSkill(userSkillId: ID!): UserSkill!

    # For Career Goals Screen
    addUserCareerGoal(userId: ID!, careerPathId: ID!): User!
    removeUserCareerGoal(userId: ID!, careerPathId: ID!): User!

    # For Final Review Screen
    addProject(userId: ID!, name: String!, description: String, githubLink: String, status: ProjectStatus): Project!
    updateProject(projectId: ID!, name: String, description: String, githubLink: String, status: ProjectStatus): Project!
    deleteProject(projectId: ID!): Project!
  }

  type ChatMessage {
    id: ID!
    sender: String!
    text: String!
  } 

  input ChatMessageInput {
    sender: String!
    text: String!
  }
`;
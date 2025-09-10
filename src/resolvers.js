// src/resolvers.js

// --- MOCK DATABASE ---
// In a real application, this data would come from a database like MongoDB or PostgreSQL.
const db = {
    users: [
      { id: '1', name: 'Alex', email: 'alex@example.com', skillIds: ['101', '102'] },
      { id: '2', name: 'Maria', email: 'maria@example.com', skillIds: ['103'] },
    ],
    skills: [
      { id: '101', name: 'JavaScript', category: 'PROGRAMMING_LANGUAGE' },
      { id: '102', name: 'React', category: 'FRAMEWORK_LIBRARY' },
      { id: '103', name: 'Project Management', category: 'SOFT_SKILL' },
      { id: '104', name: 'Kotlin', category: 'PROGRAMMING_LANGUAGE' },
    ],
  };
  
  // --- RESOLVER FUNCTIONS ---
  export const resolvers = {
    // Resolvers for Query fields
    Query: {
      user: (parent, { id }) => {
        console.log(`Fetching user with ID: ${id}`);
        return db.users.find(user => user.id === id);
      },
      skills: () => db.skills,
      getRecommendations: (parent, { forUserId }) => {
        console.log(`Calling AI model for user ID: ${forUserId}`);
        // --- AI MODEL LOGIC WOULD GO HERE ---
        // For now, we return a mock recommendation.
        return [
          {
            id: 'rec1',
            reasoning: 'Based on your interest in Android, this is a key skill.',
            recommendedSkill: db.skills.find(skill => skill.name === 'Kotlin'),
          },
        ];
      },
    },
  
    // Resolvers for Mutation fields
    Mutation: {
      updateUserSkills: (parent, { userId, skillIds }) => {
        const user = db.users.find(user => user.id === userId);
        if (!user) throw new Error('User not found!');
        
        // --- DATABASE UPDATE LOGIC WOULD GO HERE ---
        user.skillIds = skillIds;
        console.log(`Updated skills for user ${userId}:`, user);
        return user;
      },
    },
  
    // This is a "nested" resolver. When a User is requested, this tells
    // GraphQL how to get the `skills` field for that user.
    User: {
      skills: (parent) => {
        // `parent` is the user object itself (e.g., { id: '1', ... })
        return db.skills.filter(skill => parent.skillIds.includes(skill.id));
      },
    },
  };
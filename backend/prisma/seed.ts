import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; // Import bcryptjs

const prisma = new PrismaClient();

// Make the main function async to use await for hashing
async function main() {
  console.log('Start seeding ...');

  // Clear existing data to prevent conflicts
  await prisma.userSkill.deleteMany();
  await prisma.careerSkill.deleteMany();
  await prisma.recommendation.deleteMany();
  await prisma.user.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.careerPath.deleteMany();
  console.log('Cleared previous data.');

  // --- Seed Users with Hashed Passwords ---
  const hashedPassword = await bcrypt.hash('password123', 12); // Hash a common password

  const alice = await prisma.user.create({
    data: {
      email: 'alice@prisma.io',
      name: 'Alice',
      currentRole: 'Frontend Developer',
      yearsExperience: 3,
      password: hashedPassword, // Add the hashed password
    },
  });

  const bob = await prisma.user.create({
    data: {
      email: 'bob@prisma.io',
      name: 'Bob',
      currentRole: 'Backend Developer',
      yearsExperience: 5,
      password: hashedPassword, // Add the hashed password
    },
  });

  const charlie = await prisma.user.create({
    data: {
      email: 'charlie@prisma.io',
      name: 'Charlie',
      currentRole: 'Full Stack Developer',
      yearsExperience: 7,
      password: hashedPassword, // Add the hashed password
    },
  });

  console.log('Created users:', { alice, bob, charlie });
  // ... rest of your seed script for skills, careers, etc.
  // No changes needed below this line
  // --- Seed Skills ---
  const react = await prisma.skill.create({ data: { name: 'React', category: 'Frontend' } });
  const nodejs = await prisma.skill.create({ data: { name: 'Node.js', category: 'Backend' } });
  const graphql = await prisma.skill.create({ data: { name: 'GraphQL', category: 'API' } });
  const postgresql = await prisma.skill.create({ data: { name: 'PostgreSQL', category: 'Database' } });
  const docker = await prisma.skill.create({ data: { name: 'Docker', category: 'DevOps' } });

  console.log('Created skills:', { react, nodejs, graphql, postgresql, docker });

  // --- Seed Career Paths ---
  const frontendDev = await prisma.careerPath.create({
    data: {
      title: 'Senior Frontend Developer',
      description: 'Focuses on user interface and user experience.',
      demandLevel: 'High',
    },
  });

  const backendDev = await prisma.careerPath.create({
    data: {
      title: 'Senior Backend Developer',
      description: 'Manages server-side logic, databases, and APIs.',
      demandLevel: 'High',
    },
  });

  const devopsEng = await prisma.careerPath.create({
    data: {
      title: 'DevOps Engineer',
      description: 'Works on infrastructure, deployment pipelines, and automation.',
      demandLevel: 'Very High',
    },
  });
  console.log('Created career paths:', { frontendDev, backendDev, devopsEng });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
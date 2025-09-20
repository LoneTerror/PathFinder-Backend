import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Clear existing data to prevent conflicts
  await prisma.userSkill.deleteMany();
  await prisma.careerSkill.deleteMany();
  await prisma.recommendation.deleteMany();
  await prisma.project.deleteMany(); // Also clear projects
  await prisma.user.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.careerPath.deleteMany();
  console.log('Cleared previous data.');

  // --- Seed Users with Hashed Passwords ---
  const hashedPassword = await bcrypt.hash('password123', 12);

  const alice = await prisma.user.create({
    data: {
      email: 'alice@prisma.io',
      name: 'Alice',
      currentRole: 'Frontend Developer',
      yearsExperience: 3,
      password: hashedPassword,
    },
  });

  const bob = await prisma.user.create({
    data: {
      email: 'bob@prisma.io',
      name: 'Bob',
      currentRole: 'Backend Developer',
      yearsExperience: 5,
      password: hashedPassword,
    },
  });
  console.log('Created users:', { alice, bob });

  // --- NEWLY INSERTED SKILL SEEDING LOGIC ---
  const skillsToCreate = [
    { name: 'JavaScript', category: 'Programming Language' },
    { name: 'TypeScript', category: 'Programming Language' },
    { name: 'Python', category: 'Programming Language' },
    { name: 'React', category: 'Frontend Framework' },
    { name: 'Node.js', category: 'Backend Environment' },
    { name: 'GraphQL', category: 'API Technology' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'Kubernetes', category: 'DevOps' },
    { name: 'AWS', category: 'Cloud Provider' },
    { name: 'Terraform', category: 'Infrastructure as Code' },
  ];

  for (const skill of skillsToCreate) {
    await prisma.skill.upsert({
      where: { name: skill.name }, // Use a unique field to prevent duplicates
      update: {}, // No updates needed if it already exists
      create: skill,
    });
  }
  console.log('Skills seeded.');

  // --- NEWLY INSERTED CAREER PATH SEEDING LOGIC ---
  const careerPathsToCreate = [
    {
      title: 'Frontend Developer',
      description: 'Builds the user interface and experience of web applications.',
      demandLevel: 'High',
    },
    {
      title: 'Backend Developer',
      description: 'Manages the server-side logic, database, and APIs.',
      demandLevel: 'High',
    },
    {
      title: 'Full-Stack Developer',
      description: 'Works on both the frontend and backend of applications.',
      demandLevel: 'Very High',
    },
    {
      title: 'DevOps Engineer',
      description: 'Manages application deployment, infrastructure, and CI/CD pipelines.',
      demandLevel: 'Very High',
    },
    {
      title: 'AI / Machine Learning Engineer',
      description: 'Designs and builds intelligent systems and predictive models.',
      demandLevel: 'High',
    },
  ];

  for (const career of careerPathsToCreate) {
    await prisma.careerPath.upsert({
      where: { title: career.title }, 
      update: {},
      create: career,
    });
  }
  console.log('Career Paths seeded.');

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
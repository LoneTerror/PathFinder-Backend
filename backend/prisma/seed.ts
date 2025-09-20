// backend/prisma/seed.ts

import { PrismaClient, ProjectStatus, Gender } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // 1. Clear existing data in the correct order
  await prisma.userSkill.deleteMany();
  await prisma.careerSkill.deleteMany();
  await prisma.recommendation.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.careerPath.deleteMany();
  console.log('Cleared previous data.');

  // 2. Seed static data like Skills and Career Paths first
  // This makes it easier to get their IDs for linking later.
  console.log('Seeding skills and career paths...');
  const [react, nodejs, graphql, python, docker, kubernetes, aws] = await Promise.all([
    prisma.skill.create({ data: { name: 'React', category: 'Frontend' } }),
    prisma.skill.create({ data: { name: 'Node.js', category: 'Backend' } }),
    prisma.skill.create({ data: { name: 'GraphQL', category: 'API' } }),
    prisma.skill.create({ data: { name: 'Python', category: 'Programming Language' } }),
    prisma.skill.create({ data: { name: 'Docker', category: 'DevOps' } }),
    prisma.skill.create({ data: { name: 'Kubernetes', category: 'DevOps' } }),
    prisma.skill.create({ data: { name: 'AWS', category: 'Cloud Computing' } }),
  ]);

  const [frontendDev, backendDev, devopsEng] = await Promise.all([
    prisma.careerPath.create({
      data: {
        title: 'Senior Frontend Developer',
        description: 'Focuses on user interface and user experience.',
        demandLevel: 'High',
        requiredSkills: {
          create: [{ skillId: react.id, importance: 5 }],
        },
      },
    }),
    prisma.careerPath.create({
      data: {
        title: 'Senior Backend Developer',
        description: 'Manages server-side logic, databases, and APIs.',
        demandLevel: 'High',
        requiredSkills: {
          create: [
            { skillId: nodejs.id, importance: 5 },
            { skillId: graphql.id, importance: 4 },
          ],
        },
      },
    }),
    prisma.careerPath.create({
      data: {
        title: 'DevOps Engineer',
        description: 'Works on infrastructure, deployment pipelines, and automation.',
        demandLevel: 'Very High',
        requiredSkills: {
          create: [
            { skillId: docker.id, importance: 5 },
            { skillId: kubernetes.id, importance: 5 },
            { skillId: aws.id, importance: 4 },
          ],
        },
      },
    }),
  ]);
  console.log('Skills and Career Paths seeded.');

  // 3. Seed Users and connect them to existing skills and career goals
  console.log('Seeding users and their relations...');
  const hashedPassword = await bcrypt.hash('password123', 12);

  const alice = await prisma.user.create({
    data: {
      email: 'alice@prisma.io',
      name: 'Alice',
      password: hashedPassword,
      gender: Gender.FEMALE,
      phone: '123-456-7890',      // <-- ADDED
      birthday: '05/10/1995',     // <-- ADDED
      currentRole: 'Frontend Developer',
      yearsExperience: 3,
      highestQualification: 'Bachelors in Computer Science',
      longTermGoal: 'Become a Principal Frontend Engineer',
      skills: {
        create: [{ skillId: react.id, level: 'Advanced' }],
      },
      careerGoals: {
        connect: [{ id: frontendDev.id }],
      },
    },
  });

  const bob = await prisma.user.create({
    data: {
      email: 'bob@prisma.io',
      name: 'Bob',
      password: hashedPassword,
      gender: Gender.MALE,
      currentRole: 'Backend Developer',
      yearsExperience: 5,
      highestQualification: 'Masters in Software Engineering',
      longTermGoal: 'Lead a backend development team',
      skills: {
        create: [
          { skillId: nodejs.id, level: 'Expert' },
          { skillId: graphql.id, level: 'Advanced' },
        ],
      },
      careerGoals: {
        connect: [{ id: backendDev.id }, { id: devopsEng.id }],
      },
    },
  });
  console.log('Users seeded.');

  // 4. Seed Projects for the created users
  console.log('Seeding projects...');
  await prisma.project.createMany({
    data: [
      {
        name: 'Personal Portfolio Website',
        description: 'A Next.js portfolio to showcase my work.',
        githubLink: 'https://github.com/alice/portfolio',
        status: ProjectStatus.ACTIVE,
        userId: alice.id,
      },
      {
        name: 'E-commerce API',
        description: 'A GraphQL API for an online store.',
        githubLink: 'https://github.com/alice/ecommerce-api',
        status: ProjectStatus.COMPLETED,
        userId: alice.id,
      },
      {
        name: 'Data Processing Pipeline',
        description: 'An old project for processing user data.',
        githubLink: 'https://github.com/bob/data-pipeline',
        status: ProjectStatus.ARCHIVED,
        userId: bob.id,
      },
    ],
  });
  console.log('Projects seeded.');

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
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server-express';

const prisma = new PrismaClient();
// You must create a secret for signing tokens. Store this in your .env file!
const JWT_SECRET = process.env.JWT_SECRET || "JWTSECRETKEY";

export const authResolvers = {
  Mutation: {
    register: async (_: any, { email, password, name }: any) => {
      // 1. Check if user already exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new UserInputError('User with this email already exists.');
      }

      // 2. Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);

      // 3. Create the new user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      // 4. Generate a JWT
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: '7d', // Token expires in 7 days
      });

      return {
        token,
        user,
      };
    },

    login: async (_: any, { email, password }: any) => {
      // 1. Find the user by email
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new UserInputError('Invalid email or password.');
      }

      // 2. Compare the provided password with the stored hash
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new UserInputError('Invalid email or password.');
      }

      // 3. Generate a JWT
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: '7d',
      });

      return {
        token,
        user,
      };
    },
  },
};

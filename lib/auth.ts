import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        let user = null;

        try {
          const _user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });

          if (_user && credentials.password) {
            const isPasswordValid = await bcrypt.compare(credentials.password as string, _user.password);

            if (isPasswordValid) {
              user = _user;
            }
          }

          if (!user) {
            throw new Error('Invalid credentials.');
          }
        } catch (error) {
          throw new Error('Invalid credentials.');
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/404',
  },
  session: {
    strategy: 'jwt',
  },
});

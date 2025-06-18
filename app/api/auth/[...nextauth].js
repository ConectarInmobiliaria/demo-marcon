// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // Google OAuth (si configuras)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    // Credentials: para admin y corredores que seed creamos
    CredentialsProvider({
      name: 'Credenciales',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error('Email y contraseña requeridos');
        }
        // Buscar usuario en Prisma
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.passwordHash) {
          throw new Error('Email o contraseña incorrectos');
        }
        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
          throw new Error('Email o contraseña incorrectos');
        }
        // Retornar objeto user sin passwordHash
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    // signOut, error, etc. si deseas
  },
});


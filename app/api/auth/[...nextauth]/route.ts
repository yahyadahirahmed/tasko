import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, UserType } from "@prisma/client";
import bcrypt from "bcryptjs";

// Extend the built-in session types
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
      userType: UserType;
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    username: string;
    userType: UserType;
  }
}

// Extend JWT type
declare module "next-auth/jwt" {
  interface JWT {
    username: string;
    userType: UserType;
  }
}

const prisma = new PrismaClient();

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("Login attempt for username:", credentials?.username);

          if (!credentials?.username || !credentials?.password) {
            console.log("Missing credentials");
            return null;
          }

          const user = await prisma.user.findUnique({
            where: { 
              username: credentials.username 
            },
          });

          console.log("User found:", !!user);

          if (!user) {
            console.log("No user found");
            return null;
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          console.log("Password valid:", isValid);

          if (!isValid) {
            console.log("Invalid password");
            return null;
          }

          return {
            id: user.id,
            username: user.username,
            email: user.email,
            userType: user.userType,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userType = user.userType;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.userType = token.userType;
        session.user.username = token.username;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  debug: true,
});

export { handler as GET, handler as POST };

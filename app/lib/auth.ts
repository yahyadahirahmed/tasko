import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { UserType } from "@/app/types";
import { JWT } from "next-auth/jwt";
import { Session, DefaultSession } from "next-auth";
import { SessionStrategy } from "next-auth";
import { User as PrismaUser } from "@prisma/client";
import { Account, Profile, User as NextAuthUser } from "next-auth";
const prisma = new PrismaClient();
declare module "next-auth" {
  interface Session {
    user: {
      userType: string;
      username: string;
    } & DefaultSession["user"]
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    userType: string;
    username: string;
  }
}
export const authOptions = {
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
          if (!credentials?.username || !credentials?.password) {
            return null;
          }
          const user = await prisma.user.findUnique({
            where: { username: credentials.username },
          });
          if (!user) {
            return null;
          }
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValid) {
            return null;
          }
          return {
            id: user.id,
            username: user.username,
            email: user.email,
            userType: user.userType as UserType,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ 
      token, 
      user
    }: { 
      token: JWT; 
      user: PrismaUser | NextAuthUser | null; 
      account: Account | null;
      profile?: Profile;
      trigger?: "signIn" | "signUp" | "update";
    }) {
      if (user) {
        token.userType = (user as PrismaUser).userType;
        token.username = (user as PrismaUser).username;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
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
    strategy: "jwt" as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60,
  },
  debug: process.env.NODE_ENV === "development",
}; 
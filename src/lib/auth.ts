import { db } from "../db/index";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import  { NextAuthOptions } from "next-auth/";
import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcrypt"; // optional if using password hashing

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        try {
          const user = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, credentials.email));

          if (!user.length) {
            throw new Error("No user found");
          }

          const dbUser = user[0];

          // TODO: Replace this with bcrypt.compare if passwords are hashed
          const isPasswordValid = credentials.password === dbUser.password;

          // const isPasswordValid = await bcrypt.compare(credentials.password, dbUser.password);

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          return {
            id: String(dbUser.id),
            email: dbUser.email,
          };
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

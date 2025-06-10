import { db } from "@/db";
import { usersTable } from "@/db/schema"; // Make sure you have this
import { eq } from "drizzle-orm";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
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

          // You should validate password here (e.g., bcrypt compare)
          const isPasswordValid = credentials.password === dbUser.password; // Replace with real validation

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          return {
            id:String(dbUser.id),
            email:dbUser.email,
          };
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],
  callbacks:{
    async jwt({token,user}){
        if(user){
            token.id = user.id;
        }
        return token;
    },
    async session({session,token}){
        return session;
        if(session.user){
          session.user.id = token.id as string
        }
    }
  },
  pages:{
    signIn:"/login",
    error:"/login",
  },
  session:{
    strategy:"jwt",
    maxAge :30*24*60*60
  },
  secret: process.env.NEXTAUTH_SECRET

};

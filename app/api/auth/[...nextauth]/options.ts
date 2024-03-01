import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "nikola-mitic.dev",
      credentials: {
        name: { label: "Username", type: "text", placeholder: "User Name" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = {
          id: process.env.USER_ID as string,
          password: process.env.USER_PASSWORD as string,
          name: process.env.USER_NAME as string,
        };

        if (
          credentials?.password === user.password &&
          credentials.name === user.name
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session({ session }) {
      return session;
    },
  },
};

import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const isAllowedToSignIn =
        user.id === process.env.MASTER_USER_ID &&
        user.email === process.env.MASTER_USER_EMAIL &&
        user.name === process.env.MASTER_USER_NAME;

      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    session({ session, token, user }) {
      return session; // The return type will match the one returned in `useSession()`
    },
  },
};

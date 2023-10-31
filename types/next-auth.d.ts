import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's added details. */
      id?: string;
      gender?: string;
      is_admin?: boolean;
    } & DefaultSession["user"]
  }
}

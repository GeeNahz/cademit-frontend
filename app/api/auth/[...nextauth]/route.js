import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import User from "@/models/user"

import { connectToDB } from "@/utils/database"
// import type { AuthOptions, Session, Profile } from "next-auth";

// type ProfilePlus = Profile & {
//   username: string;
//   picture: string;
// }

// type SessionPlus = Session & {
//   user?: {
//     id?: string | null;
//     name?: string | null
//     email?: string | null
//     image?: string | null
//   }
// }

// export const authOptions: AuthOptions = ;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: "",
      clientSecret: "",
    })
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session?.user?.email,
      });
  
      session.user.id = sessionUser._id.toString();
  
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
  
        // Check if user already exists
        const userExists = await User.findOne({
          email: profile?.email,
        });
  
        // if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.username.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
  
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };

import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/utils/adapters/mongodb";

import { signInUser } from "@/services/SignInService";

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "database",
    maxAge: 12 * 60 * 60, // 12 hours
    updateAge: 6 * 60 * 60, // 6 hours
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        if (credentials === null) return null;

        try {
          const user = await signInUser(credentials);

          if (user) return user;

          return null;
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
    GoogleProvider({
      clientId: "",
      clientSecret: "",
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token.id = user._id;
      if (user?.is_admin) {
        token.is_admin = user.is_admin;
      } else {
        token.is_admin = false;
      }
      token.first_name = user.first_name;
      token.last_name = user.last_name;
      token.image = user.image;
      token.email = user.email;
      token.gender = user.gender;

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.is_admin = token.is_admin;
      session.user.email = token.email;
      session.user.name = token.first_name + " " + token.last_name;
      session.user.gender = token.gender;

      if (token.image) {
        session.user.image = token.image;
      } else {
        session.user.image = ""; // set default image here instead
      }

      return session;
    },
    // async signIn({ profile }) {
    //   try {
    //     await connectToDB();

    //     // Check if user already exists
    //     const userExists = await User.findOne({
    //       email: profile?.email,
    //     });

    //     // if not, create a new user
    //     if (!userExists) {
    //       await User.create({
    //         email: profile?.email,
    //         username: profile?.username.replace(" ", "").toLowerCase(),
    //         image: profile.picture,
    //       });
    //     }

    //     return true;
    //   } catch (error) {
    //     console.log(error);
    //     return false;
    //   }
    // },
  },
});

export { handler as GET, handler as POST };

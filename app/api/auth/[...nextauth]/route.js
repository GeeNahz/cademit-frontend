import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "@/utils/adapters/mongodb";

import User from "@/models/user"

import { connectToDB } from "@/utils/database"
import { useCheckHashPassword } from "@/app/hooks/keygen";

const handler = NextAuth({
  // adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        await connectToDB();

        if (credentials === null) return null;

        try {
          // Check for user in DB
          const user = await User.findOne({
            username: credentials?.username,
          });

          if (user) {
            const isPassword = useCheckHashPassword(credentials.password, user.hashed_password);
            if (isPassword) {
              return user;
            } else {
              throw new Error("Email or password is incorrect");
            }
          } else {
            throw new Error("User not found");
          }
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
      if (user?.is_admin) token.is_admin = user.is_admin;
      return token;
    },
    async session({ session, token }) {
      // const sessionUser = await User.findOne({
      //   email: session?.user?.email,
      // });

      // session.user.id = sessionUser._id.toString();

      if (token.id) session.user.id = token.id;
      if (token.is_admin) session.user.is_admin = token.is_admin;
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

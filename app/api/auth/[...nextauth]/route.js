import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/utils/adapters/mongodb";

import { status } from "@/utils/status";
import { useCheckHashPassword } from "@/app/hooks/keygen";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

async function attemptSignin(credentials) {
  try {
    await connectToDB();
    // Check for user in DB
    const user = await User.findOne({
      username: credentials.username,
    });

    if (user) {
      const isPassword = useCheckHashPassword(credentials.password, user.hashed_password);
      if (isPassword) {
        return user;
      } else {
        throw new Response("Username or password is incorrect", { status: status.HTTP_400_BAD_REQUEST });
      }
    } else {
      throw new Response("User not found", { status: status.HTTP_404_NOT_FOUND });
    }
  } catch (error) {
    throw new Response("We encountered a problem while signing you in. Please try again later", { status: status.HTTP_500_INTERNAL_SERVER_ERROR });
  }
}

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
    signOut: "/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60, // 12 hours
    updateAge: 6 * 60 * 60, // 6 hours
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const { username, password } = credentials;

        if (username === "" || password === "") return null;

        try {
          const user = await attemptSignin({ username, password })

          if (!user) return null;

          return user;
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
      if (user?.first_name) token.name = user.first_name + " " + user.last_name;
      if (user?.gender) token.gender = user.gender;
      if (user?.image) token.picture = user.image;
      if (user?.email) token.email = user.email;
      if (user?.is_admin) {
        token.is_admin = user.is_admin;
      } else {
        token.is_admin = false;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      if (token?.name) session.user.name = token.name;

      if (token?.id) session.user.id = token.id;
      if (token?.gender) session.user.gender = token.gender;
      if (token?.is_admin) session.user.is_admin = token.is_admin;

      if (token.picture) {
        session.user.image = token.picture;
      } else {
        session.user.image = "/images/default-profile.png"; // set default image here instead
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

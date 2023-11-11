import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { redirect } from 'next/navigation'

import User from '@/models/user';
import { connectToDB } from '@/utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      session.user.role = sessionUser.role; 

      return session;

    },
    async signIn({ user, account, profile }) {
      await connectToDB();
      const userExists = await User.findOne({ email: profile.email });

      if (!userExists) {
        try {
          const newUser = await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            password: profile.at_hash,
            image: profile.picture,
          });
          // Set user ID and role in the user object, so it's available in the session
          user.id = newUser._id.toString();
          user.role = newUser.role;
        } catch (error) {
          console.error("Error creating user:", error.message);
          return false; // If there's an error, do not sign in
        }
      } else {
        // Set user ID and role in the user object, so it's available in the session
        user.id = userExists._id.toString();
        user.role = userExists.role;
      }

      // Redirect to profile if user is logged in
      return { url: '/profile' };
    },
  }
})
export { handler as GET, handler as POST }
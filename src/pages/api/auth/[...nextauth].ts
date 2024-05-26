import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';

export default NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!!,
      version: '2.0', // opt-in to Twitter OAuth 2.0,
    }),
  ],
  callbacks: {
    signIn: ({ user, account, profile, email }) => {
      console.log('here');
      console.dir({ user, account, profile, email });
      return true;
    },
    session: async ({ session, token, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
});

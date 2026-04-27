import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { getUsers } from "@/app/(Backend)/lib/dbConnect";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google" || account.provider === "github") {
        const { name, email, image } = user;
        try {
          const userCollection = await getUsers();
          const userExist = await userCollection.findOne({ email });

          if (!userExist) {
            // ১. যদি নতুন ইউজার হয়, তবে সব ডাটা ইনসার্ট হবে
            await userCollection.insertOne({
              name,
              email,
              image,
              role: "user",
              provider: account.provider,
              createdAt: new Date(),
              updatedAt: new Date(), // null না দিয়ে বর্তমান সময় দেওয়া ভালো
            });
          } else {
            // ২. যদি ইউজার আগে থেকেই থাকে, তবে তার provider ফিল্ডটি আপডেট হবে
            // এটি করলে গিটহাব দিয়ে অ্যাকাউন্ট থাকলেও গুগল দিয়ে লগইন করলে provider আপডেট হবে।
            await userCollection.updateOne(
              { email },
              {
                $set: {
                  provider: account.provider,
                  updatedAt: new Date(),
                },
              },
            );
          }
          return true;
        } catch (error) {
          console.log("Database error during sign in:", error);
          return false;
        }
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };

import Profilepage from "@/Componets/Pages/profile/page";
import React from "react";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getUsers } from "@/app/(Backend)/lib/dbConnect";

export async function generateMetadata() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  let userName = "User";

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
      const userCollection = await getUsers();
      const user = await userCollection.findOne({ email: decoded.email });
      if (user?.name) {
        userName = user.name;
      }
    } catch (error) {
      // Silent error
    }
  }

  return {
    title: `${userName} | My Profile`,
    description: `View and manage ${userName}'s profile in ZAP-SHIFT-PROJECT. Update personal details and account settings securely.`,
    keywords: ["user profile", "account settings", "ZAP SHIFT PROJECT profile"],
    robots: {
      index: false,
      follow: true,
    },
  };
}

const MyProfile = () => {
  return (
    <div>
      <Profilepage />
    </div>
  );
};

export default MyProfile;
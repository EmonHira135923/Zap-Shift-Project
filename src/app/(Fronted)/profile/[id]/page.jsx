import Editpage from "@/Componets/Pages/profile/Editpage";
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
      userName = user?.name || "User";
    } catch (error) {
      // Error handled silently for metadata
    }
  }
  return { title: `${userName} | Edit Profile` };
}

const ProfileUpdate = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  let userData = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
      const userCollection = await getUsers();
      const user = await userCollection.findOne({ email: decoded.email });

      if (user) {
        userData = JSON.parse(JSON.stringify(user));
      }
    } catch (error) {
      // Error handled silently
    }
  }

  return (
    <div>
      <Editpage initialData={userData} />
    </div>
  );
};

export default ProfileUpdate;
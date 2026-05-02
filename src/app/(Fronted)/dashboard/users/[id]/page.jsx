import Usersdetailspage from "@/Componets/Pages/dashboard/Users/Usersdetailspage";
import { getUsers } from "@/app/(Backend)/lib/dbConnect";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";

// ১. মেটাডেটা জেনারেশন (সরাসরি DB থেকে)
export async function generateMetadata({ params }) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) return { title: "Invalid User" };

  try {
    const usersCollection = await getUsers();
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });

    return {
      title: `${user?.name || "User"} | User Details`,
      description: `View profile of ${user?.name}`,
    };
  } catch (e) {
    return { title: "Error" };
  }
}

// ২. মেইন পেজ কম্পোনেন্ট
const UsersDetailsPage = async ({ params }) => {
  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    notFound();
  }

  let user = null;

  try {
    const usersCollection = await getUsers();
    const userData = await usersCollection.findOne({ _id: new ObjectId(id) });

    if (!userData) {
      notFound();
    }

    // MongoDB object কে প্লেইন অবজেক্টে রূপান্তর (Next.js এর জন্য জরুরি)
    user = JSON.parse(JSON.stringify(userData));
    delete user.password; // সিকিউরিটির জন্য পাসওয়ার্ড বাদ দিন
  } catch (error) {
    console.error("Database Error:", error);
    notFound();
  }

  return (
    <div>
      <Usersdetailspage user={user} />
    </div>
  );
};

export default UsersDetailsPage;
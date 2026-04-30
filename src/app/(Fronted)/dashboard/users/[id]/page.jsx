import Usersdetailspage from "@/Componets/Pages/dashboard/Users/Usersdetailspage";
import axios from "axios";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const res = await axios.get(
      `${process.env.NEXT_AUTH_URL}/api/auth/register/${id}`
    );

    const user = res.data.message;

    return {
      title: `${user?.name} | User Details`,
      description: `View detailed profile information of ${user?.name} in dashboard.`,
      keywords: [
        user?.name,
        "user details",
        "dashboard profile",
        "admin panel",
      ],
    };
  } catch (error) {
    return {
      title: "User Not Found",
      description: "Requested user not found.",
    };
  }
}

const UsersDetailsPage = async ({ params }) => {
  const { id } = await params;
  let user = null;

  try {
    const res = await axios.get(
      `${process.env.NEXT_AUTH_URL}/api/auth/register/${id}`
    );

    user = res.data.message;
  } catch (error) {
    notFound();
  }

  return (
    <div>
      <Usersdetailspage user={user} />
    </div>
  );
};

export default UsersDetailsPage;
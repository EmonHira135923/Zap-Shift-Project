import DashboardLayoutClient from "@/Componets/Shared/DashboardLayoutClient";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

// ডাইনামিক মেটাডেটা ফাংশন
export async function generateMetadata() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  let role = "User"; // Default Role

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
      const { payload } = await jwtVerify(token, secret);
      role = payload?.role || "User";
    } catch (e) {
      console.error("Metadata JWT Error:", e);
    }
  }

  // রোল অনুযায়ী টাইটেল সেট করা
  const roleTitles = {
    admin: "Admin Control Panel",
    rider: "Rider Delivery Portal",
    user: "User Dashboard",
  };

  const currentTitle = roleTitles[role.toLowerCase()] || "Dashboard";

  return {
    title: {
      default: `${currentTitle} | ZAP-SHIFT-PROJECT`,
      template: `%s | ${currentTitle} | ZAP-SHIFT-PROJECT`,
    },
    description: `Access your ${role} dashboard at ZAP-SHIFT-PROJECT to manage parcels and track deliveries securely.`,
    openGraph: {
      title: `${currentTitle} | ZAP-SHIFT-PROJECT`,
      description: `Manage your courier activities as a ${role}.`,
      url: "https://yourdomain.com/dashboard",
      siteName: "ZAP-SHIFT-PROJECT",
      type: "website",
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

const DashboardLayout = ({ children }) => {
  return (
    <DashboardLayoutClient>
      {children}
    </DashboardLayoutClient>
  );
};

export default DashboardLayout;
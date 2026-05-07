import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { getToken } from "next-auth/jwt";

export const verifyRider = async (request) => {
  try {
    const cookieStore = await cookies();

    // ১. কাস্টম কুকি টোকেন চেক (accessToken)
    const token = cookieStore.get("accessToken")?.value;

    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
        const { payload } = await jwtVerify(token, secret);

        // এখানে চেক করা হচ্ছে রোল 'rider' কি না
        if (payload?.role === "rider") {
          return payload;
        }
      } catch (error) {
        console.log("CUSTOM RIDER TOKEN VERIFY ERROR:", error.message);
      }
    }

    // ২. নেক্সট-অথ টোকেন চেক (যদি কাস্টম টোকেন না থাকে বা রিকোয়েস্ট অবজেক্ট থাকে)
    if (request) {
      const nextAuthToken = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (nextAuthToken?.role === "rider") {
        return nextAuthToken;
      }
    }

    return null; // যদি রাইডার না হয়
  } catch (error) {
    console.error("VERIFY RIDER ERROR:", error.message);
    return null;
  }
};
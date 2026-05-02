import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export const verifyToken = async () => {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("accessToken")?.value;

    console.log("ACCESS TOKEN:", token);

    if (!token) {
      return null;
    }

    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

    const { payload } = await jwtVerify(token, secret);

    console.log("DECODED USER:", payload);

    return payload;
  } catch (error) {
    console.log("VERIFY ERROR:", error.message);
    return null;
  }
};
import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; // Next.js Edge Runtime-এর জন্য jose ব্যবহার করা সেরা

const privateRoutes = ["/be-a-rider", "/dashboard", "/profile"];

export async function proxy(request) {
  const reqpath = request.nextUrl.pathname;

  // ১. কুকি থেকে টোকেনটি বের করা
  const nextAuthToken = request.cookies.get("next-auth.session-token")?.value;
  const customToken = request.cookies.get("accessToken")?.value;

  const tokenValue = nextAuthToken || customToken;
  const isAuthenticated = Boolean(tokenValue);

  // ২. প্রাইভেট রুট চেক
  const isPrivateRoute = privateRoutes.some((route) =>
    reqpath.startsWith(route),
  );

  console.log("Checking route:", reqpath, "| Logged In:", isAuthenticated);

  // ৩. যদি লগইন না থাকে এবং প্রাইভেট রুটে যেতে চায়
  if (!isAuthenticated && isPrivateRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // ৪. টোকেন ডিকোড এবং রোল ভ্যালিডেশন
  if (isAuthenticated && tokenValue) {
    try {
      // আপনার কাস্টম টোকেনটি ভেরিফাই করার জন্য
      // দ্রষ্টব্য: secret টিকে TextEncoder দিয়ে এনকোড করতে হবে
      const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

      // এটি টোকেন ভেরিফাই করবে এবং পেলোড দিবে
      const { payload } = await jwtVerify(tokenValue, secret).catch(() => ({
        payload: null,
      }));

      if (payload) {
        console.log("User Role:", payload.role);

        if (reqpath.startsWith("/dashboard") && payload.role !== "admin") {
          console.log("Access Denied: Not an Admin");
          return NextResponse.redirect(new URL("/forbidden", request.url));
        }
      }
    } catch (error) {
      // NextAuth টোকেন হলে এটি এরর দিতে পারে, তাই আমরা ইগনোর করতে পারি
      console.log("Token check skipped or failed.");
    }
  }

  return NextResponse.next();
}

// ফাইলটির নাম অবশ্যই middleware.js হতে হবে
export const config = {
  matcher: ["/be-a-rider/:path*", "/dashboard/:path*", "/profile/:path*"],
};

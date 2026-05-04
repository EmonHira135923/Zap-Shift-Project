import { getUsers } from "@/app/(Backend)/lib/dbConnect";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const userCollection = await getUsers();
    const body = await request.json();
    const { email, password } = body;

    // ১. ইনপুট ভ্যালিডেশন
    if (!email || !password) {
      return Response.json(
        { success: false, message: "Missing email or password" },
        { status: 400 },
      );
    }

    // ২. ইউজার খুঁজে বের করা
    const user = await userCollection.findOne({ email });

    // ৩. ইউজার চেক এবং পাসওয়ার্ড আছে কি না তা দেখা
    if (!user) {
      return Response.json(
        { success: false, message: "Invalid credentials" },
        { status: 400 },
      );
    }

    // ৪. যদি ইউজার থাকে কিন্তু পাসওয়ার্ড সেট করা না থাকে (সোশ্যাল ইউজার)
    if (!user.password) {
      return Response.json(
        {
          success: false,
          message: `This account is linked with ${user.provider}. Please set a password via registration or use social login.`,
        },
        { status: 400 },
      );
    }

    // ৫. পাসওয়ার্ড কম্পেয়ার করা
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return Response.json(
        { success: false, message: "Invalid credentials" },
        { status: 400 },
      );
    }

    // ৬. JWT Payload তৈরি
    const payload = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      provider: user.provider, // এটি credentials, google বা github হতে পারে
    };

    const accessToken = jwt.sign(payload, process.env.NEXTAUTH_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(
      payload,
      process.env.NEXTAUTH_REFRESH_SECRET,
      { expiresIn: "7d" },
    );

    // ৭. Cookies সেট করা
    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60,
      path: "/", // পাথ নিশ্চিত করা ভালো
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    return Response.json(
      {
        message: "User Login Successfully.",
        success: true,
        result: {
          ...userWithoutPassword,
          _id: user._id.toString(),
        },
        accessToken,
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      {
        message: "Login Failed",
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}

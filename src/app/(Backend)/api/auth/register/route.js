import { getUsers } from "../../../lib/dbConnect";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const usersCollection = await getUsers();
    const body = await request.json();
    const { name, email, password, image, phone } = body;

    // ১. ইমেইল দিয়ে ইউজার খুঁজুন
    const existingUser = await usersCollection.findOne({ email });

    // ২. যদি ইউজার আগে থেকেই থাকে এবং তার পাসওয়ার্ড অলরেডি সেট করা থাকে
    if (existingUser && existingUser.password) {
      return Response.json(
        {
          success: false,
          message: "User already exists with this email and password.",
        },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingUser) {
      // ৩. ইউজার আগে সোশ্যাল (Google/GitHub) দিয়ে ঢুকেছিল, এখন পাসওয়ার্ড সেট করছে
      await usersCollection.updateOne(
        { email },
        {
          $set: {
            password: hashedPassword,
            phone: phone,
            provider: "credentials", // প্রোভাইডার ক্রেডিয়েন্সিয়াল হিসেবেও গণ্য হবে
            updatedAt: new Date(),
          },
        },
      );
      return Response.json({
        success: true,
        message: "Password added to your existing social account.",
      });
    } else {
      // ৪. সম্পূর্ণ নতুন ইউজার
      const newUser = {
        name,
        email,
        password: hashedPassword,
        image,
        phone,
        provider: "credentials",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await usersCollection.insertOne(newUser);
      return Response.json({
        success: true,
        message: "Registration successful",
      });
    }
  } catch (err) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

// GET Method (সব ইউজার দেখার জন্য)
export async function GET() {
  try {
    const usersCollection = await getUsers();
    const result = await usersCollection.find({}).toArray();
    return Response.json({ success: true, message: result }, { status: 200 });
  } catch (err) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

import { getUsers } from "@/app/(Backend)/lib/dbConnect";
import { verifyAdmin } from "@/app/(Backend)/middlewares/IsAdmin";
import { verifyToken } from "@/app/(Backend)/middlewares/verifyToken";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const usersCollection = await getUsers();
    const body = await request.json();
    const { name, email, password, image, phone, token } = body;

    // ১. ইমেইল দিয়ে ইউজার খুঁজুন
    const existingUser = await usersCollection.findOne({ email });

    // ২. ইনভাইটেশন টোকেন চেক (যদি টোকেন পাঠানো হয়)
    if (token) {
      const invitedUser = await usersCollection.findOne({
        email,
        invitationToken: token,
        invitationExpires: { $gt: new Date() }
      });

      if (!invitedUser) {
        return Response.json(
          { success: false, message: "Invalid or expired invitation token." },
          { status: 400 }
        );
      }

      // টোকেন সঠিক হলে পাসওয়ার্ড হ্যাশ করে ডাটা আপডেট করুন
      const hashedPassword = await bcrypt.hash(password, 10);
      await usersCollection.updateOne(
        { email },
        {
          $set: {
            name,
            password: hashedPassword,
            image,
            phone,
            provider: "credentials",
            updatedAt: new Date(),
          },
          $unset: { invitationToken: "", invitationExpires: "" } // টোকেন মুছে ফেলা
        }
      );

      return Response.json({ success: true, message: "Registration completed via invitation!" });
    }

    // ৩. সাধারণ রেজিস্ট্রেশন লজিক (টোকেন ছাড়া)
    if (existingUser && existingUser.password) {
      return Response.json(
        { success: false, message: "User already exists with this email." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingUser) {
      // সোশ্যাল ইউজার এখন পাসওয়ার্ড সেট করছে
      await usersCollection.updateOne(
        { email },
        {
          $set: {
            password: hashedPassword,
            phone: phone,
            provider: "credentials",
            updatedAt: new Date(),
          },
        }
      );
      return Response.json({ success: true, message: "Password added to social account." });
    } else {
      // সম্পূর্ণ নতুন সাধারণ ইউজার
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
      return Response.json({ success: true, message: "Registration successful" });
    }
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

// GET Method (সব ইউজার দেখার জন্য)
export async function GET() {
  try {
    const user = await verifyToken();
    const isAdmin = await verifyAdmin();

    if (!user || !isAdmin) {
      return Response.json({ success: false, message: "Unauthorized" }, { status: 403 });
    }

    const usersCollection = await getUsers();
    const result = await usersCollection.find({}).toArray();
    return Response.json({ success: true, message: result }, { status: 200 });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
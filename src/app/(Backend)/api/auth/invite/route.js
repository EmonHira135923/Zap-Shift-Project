import { getUsers } from "@/app/(Backend)/lib/dbConnect";
import { getInvitationEmailTemplate } from "@/app/(Backend)/lib/emailTemplates";
import { sendEmail } from "@/app/(Backend)/lib/sendEmail";
import { verifyAdmin } from "@/app/(Backend)/middlewares/IsAdmin";
import crypto from "crypto";

export async function POST(request) {
  try {
    // ১. এডমিন ভেরিফিকেশন
    const admin = await verifyAdmin();
    if (!admin) {
      return Response.json({ success: false, message: "Unauthorized" }, { status: 403 });
    }

    const { email, role } = await request.json();
    if (!email) {
      return Response.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    // ২. টোকেন তৈরি ও ডাটাবেসে সেভ
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // ২৪ ঘণ্টা মেয়াদ

    const usersCollection = await getUsers();
    await usersCollection.updateOne(
      { email },
      { 
        $set: { 
          email, 
          role: role || "user", 
          invitationToken: token, 
          invitationExpires: expires,
          updatedAt: new Date() 
        },
        $setOnInsert: { createdAt: new Date() } // শুধু নতুন ইউজার হলে createdAt সেট হবে
      },
      { upsert: true }
    );

    // ৩. ইনভাইটেশন লিঙ্ক তৈরি
    const inviteLink = `${process.env.NEXT_AUTH_URL}/auth/register?token=${token}&email=${email}`;

    // ৪. ইমেইল পাঠানো (টেমপ্লেট ব্যবহার করে)
    await sendEmail({
      to: email,
      subject: "Action Required: Complete your ZapShift Registration",
      html: getInvitationEmailTemplate(inviteLink, role || "user"),
    });

    return Response.json({ success: true, message: "Invitation sent successfully!" });
  } catch (error) {
    console.error("Invite Error:", error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
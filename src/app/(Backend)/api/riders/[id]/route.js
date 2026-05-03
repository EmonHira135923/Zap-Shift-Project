import { getRiders, getUsers } from "@/app/(Backend)/lib/dbConnect";
import { verifyAdmin } from "@/app/(Backend)/middlewares/IsAdmin";
import { verifyToken } from "@/app/(Backend)/middlewares/verifyToken";
import { ObjectId } from "mongodb"; // ID দিয়ে সার্চ করার জন্য এটি প্রয়োজন

export async function GET(request) {
  try {
    // ১. প্রথমে টোকেন চেক
    const user = await verifyToken(request);
    if (!user) {
      return Response.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 },
      );
    }

    // ২. অ্যাডমিন মিডলওয়্যার চেক
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return Response.json(
        { success: false, message: "Forbidden: Admin access only" },
        { status: 403 },
      );
    }

    const ridersCollection = await getRiders();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    let result;

    if (id) {
      if (!ObjectId.isValid(id)) {
        return Response.json(
          { success: false, message: "Invalid ID format" },
          { status: 400 },
        );
      }
      result = await ridersCollection.findOne({ _id: new ObjectId(id) });

      if (!result) {
        return Response.json(
          { success: false, message: "Rider not found" },
          { status: 404 },
        );
      }
    } else {
      // সব রাইডার নিয়ে আসা
      result = await ridersCollection.find().sort({ appliedAt: -1 }).toArray();
    }

    // গুরুত্বপূর্ণ পরিবর্তন: অ্যাডমিন চেক লজিক
    // যদি কোনো রাইডারের রোল 'admin' হয়, তাকে আমরা মডিফাই করতে দিব না
    return Response.json({ success: true, data: result }, { status: 200 });
  } catch (err) {
    console.error("GET Error:", err);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;

    // ১. টোকেন ও অ্যাডমিন ভেরিফিকেশন
    const user = await verifyToken(request);
    const isAdmin = await verifyAdmin(request);

    if (!user) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    if (!isAdmin) {
      return Response.json(
        { success: false, message: "Forbidden" },
        { status: 403 },
      );
    }

    // ২. আইডি ভ্যালিডেশন
    if (!id || !ObjectId.isValid(id)) {
      return Response.json(
        { success: false, message: "Invalid ID" },
        { status: 400 },
      );
    }

    // ৩. বডি থেকে স্ট্যাটাস নেওয়া
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return Response.json(
        { success: false, message: "Status is required" },
        { status: 400 },
      );
    }

    const riderCollection = await getRiders();
    const query = { _id: new ObjectId(id) };

    // ৪. রাইডারের স্ট্যাটাস আপডেট করা
    const updatedDoc = {
      $set: { status: status },
    };

    const result = await riderCollection.updateOne(query, updatedDoc);

    if (result.modifiedCount === 0) {
      return Response.json(
        { success: false, message: "No changes made" },
        { status: 404 },
      );
    }

    if (status === "Accepted") {
      const riderData = await riderCollection.findOne(query);
      if (riderData?.email) {
        const usersCollection = await getUsers();
        await usersCollection.updateOne(
          { email: riderData.email },
          { $set: { role: "rider" } },
        );
      }
    }

    return Response.json(
      {
        success: true,
        message: `Rider request ${status} successfully`,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("PATCH Error:", err);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    // ১. ডাইনামিক আইডি সংগ্রহ (Next.js-এ এখন params await করতে হয়)
    const { id } = await params;

    // ২. টোকেন ভেরিফিকেশন (ইউজার লগইন আছে কিনা)
    const user = await verifyToken(request);
    if (!user) {
      return Response.json(
        { success: false, message: "Unauthorized: Please login first" },
        { status: 401 },
      );
    }

    // ৩. অ্যাডমিন ভেরিফিকেশন (শুধুমাত্র অ্যাডমিন ডিলিট করতে পারবে)
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return Response.json(
        { success: false, message: "Forbidden: Only admin can delete riders" },
        { status: 403 },
      );
    }

    // ৪. ID ভ্যালিডেশন চেক
    if (!id || !ObjectId.isValid(id)) {
      return Response.json(
        { success: false, message: "Valid Rider ID is required" },
        { status: 400 },
      );
    }

    const ridersCollection = await getRiders();

    // ৫. ডাটাবেজ থেকে ডিলিট অপারেশন চালানো
    const result = await ridersCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return Response.json(
        { success: true, message: "Rider deleted successfully" },
        { status: 200 },
      );
    } else {
      return Response.json(
        { success: false, message: "Rider not found or already deleted" },
        { status: 404 },
      );
    }
  } catch (err) {
    console.error("DELETE Error:", err);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

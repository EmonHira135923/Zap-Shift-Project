import { getRiders } from "../../lib/dbConnect";
import { verifyToken } from "../../middlewares/verifyToken";
import { verifyAdmin } from "../../middlewares/IsAdmin";

export async function GET(request) {
  try {
    // ১. প্রথমে টোকেন চেক (লগইন আছে কিনা)
    const user = await verifyToken(request);
    if (!user) {
      return Response.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 },
      );
    }

    // ২. অ্যাডমিন মিডলওয়্যার চেক (অ্যাডমিন ছাড়া অন্য কেউ এই লাইনের নিচে যেতে পারবে না)
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return Response.json(
        { success: false, message: "Forbidden: Admin access only" },
        { status: 403 },
      );
    }

    // ৩. ডাটাবেজ থেকে ডাটা নিয়ে আসা
    const ridersCollection = await getRiders();
    const result = await ridersCollection
      .find()
      .sort({ appliedAt: -1 })
      .toArray();

    return Response.json({ success: true, data: result }, { status: 200 });
  } catch (err) {
    console.error("GET Error:", err);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const user = await verifyToken(request);
    if (!user) {
      return Response.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 },
      );
    }

    const ridersCollection = await getRiders();
    const riderData = await request.json();

    // ১. ইমেইল চেক করা (একই ইউজার যেন বারবার আবেদন করতে না পারে)
    const existingRider = await ridersCollection.findOne({
      email: riderData.email,
    });

    if (existingRider) {
      return Response.json(
        {
          success: false,
          message: "You have already applied with this email!",
        },
        { status: 400 }, // Bad Request
      );
    }

    // ২. অ্যাডিশনাল ডেটা সেট করা
    const finalRider = {
      ...riderData,
      status: "pending",
      appliedAt: new Date(),
    };

    const result = await ridersCollection.insertOne(finalRider);

    return Response.json(
      { success: true, message: "Application received", result },
      { status: 201 }, // Created
    );
  } catch (err) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

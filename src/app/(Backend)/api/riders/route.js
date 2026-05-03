import { getRiders } from "../../lib/dbConnect";
import { verifyAdmin } from "../../middlewares/IsAdmin";
import { verifyToken } from "../../middlewares/verifyToken";

export async function GET(request) {
  try {
    // ১. ইউজার লগইন করা আছে কিনা চেক (Token Verification)
    const user = await verifyToken(request);
    if (!user) {
      return Response.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 },
      );
    }

    const admin = await verifyAdmin(request);

    if (!admin) {
      return Response.json(
        { success: false, message: "Unauthorized access" },
        { status: 403 },
      );
    }

    const ridersCollection = await getRiders();

    // ৩. সব রাইডারদের ডাটা নিয়ে আসা (সর্টিং সহ)
    const result = await ridersCollection
      .find()
      .sort({ appliedAt: -1 })
      .toArray();

    return Response.json({ success: true, data: result }, { status: 200 });
  } catch (err) {
    return Response.json(
      { success: false, message: err.message },
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

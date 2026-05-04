import { getRiders } from "../../lib/dbConnect";
import { verifyAdmin } from "../../middlewares/IsAdmin";
import { verifyToken } from "../../middlewares/verifyToken";

export async function GET(request) {
  try {
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
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page")) || 1;

    const limit = 10;
    const skip = (page - 1) * limit;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { contact: { $regex: search, $options: "i" } },
        { district: { $regex: search, $options: "i" } },
        { vehicle: { $regex: search, $options: "i" } },
        { status: { $regex: search, $options: "i" } },
      ];
    }

    const result = await ridersCollection
      .find(query)
      .sort({ appliedAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await ridersCollection.countDocuments(query);

    return Response.json({
      success: true,
      data: result,
      total,
      page,
      limit,
    });
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

import { getParcels } from "../../lib/dbConnect";
import { verifyToken } from "../../middlewares/verifyToken";

export async function GET(request) {
  try {
    const user = await verifyToken(request);

    if (!user) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const parcelCollections = await getParcels();
    const { searchParams } = new URL(request.url);

    const email = searchParams.get("email");
    const search = searchParams.get("search");
    const DeliveryStatus = searchParams.get("DeliveryStatus");
    const paymentStatus = searchParams.get("paymentStatus");
    const page = parseInt(searchParams.get("page")) || 1;

    const limit = 10;
    const skip = (page - 1) * limit;

    const query = {};

    if (email) {
      if (user.role !== "admin" && user.email !== email) {
        return Response.json(
          { success: false, message: "Forbidden" },
          { status: 403 },
        );
      }
      query.senderEmail = email;
    } else if (user.role !== "admin") {
      query.senderEmail = user.email;
    }

    if (DeliveryStatus) {
      query.DeliveryStatus =
        DeliveryStatus === "pending pickup"
          ? { $in: ["pending pickup", "peanding pickup", null] }
          : DeliveryStatus;
    }

    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }

    if (search) {
      query.$or = [
        { trackingId: { $regex: search, $options: "i" } },
        { receiverName: { $regex: search, $options: "i" } },
        { parcelType: { $regex: search, $options: "i" } },
        { parcelName: { $regex: search, $options: "i" } },
        { paymentStatus: { $regex: search, $options: "i" } },
      ];
    }

    const result = await parcelCollections
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await parcelCollections.countDocuments(query);

    return Response.json({
      success: true,
      message: result,
      total,
      page,
      limit,
    });
  } catch (err) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const user = await verifyToken(request);
    if (!user) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    const parcelCollections = await getParcels();
    const body = await request.json();
    const newParcel = {
      ...body,
      senderEmail: user.email || body.senderEmail,
      senderName: body.senderName || user.name,
      paymentStatus: body.paymentStatus || "unpaid",
      DeliveryStatus: body.DeliveryStatus || "pending payment",
      createdAt: new Date(),
      updatedAt: null,
    };
    const result = await parcelCollections.insertOne(newParcel);
    return Response.json({ success: true, message: result }, { status: 200 });
  } catch (err) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

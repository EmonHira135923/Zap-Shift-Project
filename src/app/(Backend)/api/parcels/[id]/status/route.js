import { getParcels, getRiders } from "@/app/(Backend)/lib/dbConnect";
import { logTracking } from "@/app/(Backend)/lib/logTracking";
import { verifyRider } from "@/app/(Backend)/middlewares/IsRider";
import { verifyToken } from "@/app/(Backend)/middlewares/verifyToken";
import { ObjectId } from "mongodb";

const ASSIGNED_STATUS_REGEX = /^rider assigned$/i;
const VALID_ACTIONS = ["accept", "reject", "pickup", "deliver"];

// স্ট্যাটাস বানানে ভুল এড়াতে এবং কোড ক্লিন রাখতে অবজেক্ট ব্যবহার
const PROGRESS_ACTIONS = {
  pickup: {
    nextStatus: "picked up",
    timestampField: "pickedUpAt",
    riderWorkStatus: "In-Transit",
    allowedStatuses: ["accepted", "rider arriving"],
    message: "Parcel picked up successfully",
    conflictMessage: "This parcel cannot be picked up now",
  },
  deliver: {
    nextStatus: "delivered",
    timestampField: "deliveredAt",
    riderWorkStatus: "available",
    allowedStatuses: ["picked up"],
    message: "Parcel delivered successfully",
    conflictMessage: "This parcel must be picked up before delivery",
  },
};

export async function PATCH(request, { params }) {
  try {
    const user = await verifyToken(request);
    if (!user) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const rider = await verifyRider(request);
    if (!rider) {
      return Response.json(
        { success: false, message: "Forbidden-Rider Access Only" },
        { status: 403 },
      );
    }

    const parcelCollection = await getParcels();
    const riderCollection = await getRiders();

    const { id } = await params;
    const { action, trackingId } = await request.json();

    // ১. আইডি ও অ্যাকশন ভ্যালিডেশন
    if (!ObjectId.isValid(id)) {
      return Response.json(
        { success: false, message: "Invalid parcel id" },
        { status: 400 },
      );
    }
    if (!VALID_ACTIONS.includes(action)) {
      return Response.json(
        { success: false, message: "Invalid action type" },
        { status: 400 },
      );
    }

    const parcelObjectId = new ObjectId(id);
    const parcel = await parcelCollection.findOne({ _id: parcelObjectId });

    if (!parcel) {
      return Response.json(
        { success: false, message: "Parcel not found" },
        { status: 404 },
      );
    }

    const now = new Date();
    let finalNextStatus = "";
    let riderWorkStatus = "";
    let responseMessage = "";

    // ২. অ্যাকশন অনুযায়ী লজিক হ্যান্ডলিং
    if (action === "pickup" || action === "deliver") {
      const config = PROGRESS_ACTIONS[action];
      const normalizedStatus = parcel.DeliveryStatus?.toLowerCase().trim();

      if (!config.allowedStatuses.includes(normalizedStatus)) {
        return Response.json(
          { success: false, message: config.conflictMessage },
          { status: 409 },
        );
      }

      finalNextStatus = config.nextStatus;
      riderWorkStatus = config.riderWorkStatus;
      responseMessage = config.message;

      // পার্সেল আপডেট (Time-stamp সহ)
      await parcelCollection.updateOne(
        { _id: parcelObjectId },
        {
          $set: {
            DeliveryStatus: finalNextStatus,
            [config.timestampField]: now,
            updatedAt: now,
          },
        },
      );
    } else {
      // ৩. Accept/Reject লজিক
      finalNextStatus = action === "accept" ? "accepted" : "rejected";

      const result = await parcelCollection.updateOne(
        { _id: parcelObjectId, DeliveryStatus: ASSIGNED_STATUS_REGEX },
        { $set: { DeliveryStatus: finalNextStatus, updatedAt: now } },
      );

      if (result.matchedCount === 0) {
        return Response.json(
          { success: false, message: "Already processed or invalid status" },
          { status: 409 },
        );
      }

      riderWorkStatus = action === "accept" ? "In-Transit" : "available";
      responseMessage =
        action === "accept"
          ? "Delivery accepted successfully"
          : "Delivery rejected successfully";
    }

    // ৪. কমন অপারেশন (Tracking & Rider Update)
    if (trackingId) {
      await logTracking(trackingId, finalNextStatus);
    }

    if (parcel.riderId && ObjectId.isValid(parcel.riderId)) {
      await riderCollection.updateOne(
        { _id: new ObjectId(parcel.riderId) },
        { $set: { workStatus: riderWorkStatus, updatedAt: now } },
      );
    }

    return Response.json({
      success: true,
      message: responseMessage,
      DeliveryStatus: finalNextStatus,
    });
  } catch (error) {
    console.error("PATCH Error:", error.message);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

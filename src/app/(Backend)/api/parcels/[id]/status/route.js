import { getParcels, getRiders } from "@/app/(Backend)/lib/dbConnect";
import { ObjectId } from "mongodb";

const ASSIGNED_STATUS_REGEX = /^rider assigned$/i;

export async function PATCH(request, { params }) {
  try {
    const parcelCollection = await getParcels();
    const riderCollection = await getRiders();

    const { id } = await params;
    const { action } = await request.json();

    if (!ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid parcel id",
        },
        {
          status: 400,
        },
      );
    }

    if (!["accept", "reject"].includes(action)) {
      return Response.json(
        {
          success: false,
          message: "Invalid action",
        },
        {
          status: 400,
        },
      );
    }

    const parcelObjectId = new ObjectId(id);

    const parcel = await parcelCollection.findOne({
      _id: parcelObjectId,
    });

    if (!parcel) {
      return Response.json(
        {
          success: false,
          message: "Parcel not found",
        },
        {
          status: 404,
        },
      );
    }

    const nextStatus = action === "accept" ? "accepted" : "rejected";

    const result = await parcelCollection.updateOne(
      {
        _id: parcelObjectId,
        DeliveryStatus: ASSIGNED_STATUS_REGEX,
      },
      {
        $set: {
          DeliveryStatus: nextStatus,
          updatedAt: new Date(),
        },
      },
    );

    if (result.matchedCount === 0) {
      return Response.json(
        {
          success: false,
          message: "This parcel is already accepted or rejected",
        },
        {
          status: 409,
        },
      );
    }

    if (parcel.riderId && ObjectId.isValid(parcel.riderId)) {
      await riderCollection.updateOne(
        {
          _id: new ObjectId(parcel.riderId),
        },
        {
          $set: {
            workStatus: action === "accept" ? "In-Transit" : "available",
            updatedAt: new Date(),
          },
        },
      );
    }

    return Response.json({
      success: true,
      message:
        action === "accept"
          ? "Delivery accepted successfully"
          : "Delivery rejected successfully",
      DeliveryStatus: nextStatus,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

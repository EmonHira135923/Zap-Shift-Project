import { getParcels, getRiders } from "@/app/(Backend)/lib/dbConnect";
import { ObjectId } from "mongodb";

const ASSIGNED_STATUS_REGEX = /^rider assigned$/i;
const VALID_ACTIONS = ["accept", "reject", "pickup", "deliver"];
const PROGRESS_BLOCKED_STATUSES = {
  pickup: [
    "pending payment",
    "pending pickup",
    "peanding pickup",
    "rider assigned",
    "rejected",
    "picked up",
    "delivered",
  ],
  deliver: [
    "pending payment",
    "pending pickup",
    "peanding pickup",
    "rider assigned",
    "rejected",
    "delivered",
  ],
};
const PROGRESS_ALLOWED_STATUS_FILTERS = {
  pickup: [/^accepted$/i, /^rider arriving$/i],
  deliver: [/^picked up$/i],
};
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

    if (!VALID_ACTIONS.includes(action)) {
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

    if (action === "pickup" || action === "deliver") {
      const progressAction = PROGRESS_ACTIONS[action];
      const normalizedStatus = String(parcel.DeliveryStatus || "")
        .trim()
        .toLowerCase();

      if (!progressAction.allowedStatuses.includes(normalizedStatus)) {
        return Response.json(
          {
            success: false,
            message: progressAction.conflictMessage,
          },
          {
            status: 409,
          },
        );
      }

      const now = new Date();
      const result = await parcelCollection.updateOne(
        {
          _id: parcelObjectId,
          $and: [
            {
              DeliveryStatus: {
                $nin: PROGRESS_BLOCKED_STATUSES[action],
              },
            },
            {
              DeliveryStatus: {
                $in: PROGRESS_ALLOWED_STATUS_FILTERS[action],
              },
            },
          ],
        },
        {
          $set: {
            DeliveryStatus: progressAction.nextStatus,
            [progressAction.timestampField]: now,
            updatedAt: now,
          },
        },
      );

      if (result.matchedCount === 0) {
        return Response.json(
          {
            success: false,
            message: progressAction.conflictMessage,
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
              workStatus: progressAction.riderWorkStatus,
              updatedAt: now,
            },
          },
        );
      }

      return Response.json({
        success: true,
        message: progressAction.message,
        DeliveryStatus: progressAction.nextStatus,
      });
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

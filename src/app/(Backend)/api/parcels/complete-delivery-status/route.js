import { getParcels } from "@/app/(Backend)/lib/dbConnect";
import { verifyRider } from "@/app/(Backend)/middlewares/IsRider";
import { verifyToken } from "@/app/(Backend)/middlewares/verifyToken";

export async function GET(request) {
  try {
    const user = await verifyToken(request);

    if (!user) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const rider = await verifyRider(request);

    if (!rider) {
      return Response.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    const parcelCollection = await getParcels();

    const pipeline = [
      {
        $match: {
          riderEmail: user.email,
        },
      },
      {
        $facet: {
          pickedUpStats: [
            {
              $match: {
                pickedUpAt: { $exists: true },
              },
            },
            {
              $count: "totalPickedUp",
            },
          ],

          completeDeliveryStats: [
            {
              $match: {
                DeliveryStatus: "delivered",
              },
            },
            {
              $count: "totalCompleted",
            },
          ],

          deliveredStats: [
            {
              $match: {
                deliveredAt: { $exists: true },
              },
            },
            {
              $count: "totalDelivered",
            },
          ],
        },
      },
    ];

    const result = await parcelCollection.aggregate(pipeline).toArray();

    return Response.json({
      success: true,
      total: result[0],
    });
  } catch (error) {
    console.error("Error:", error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
import { getParcels } from "@/app/(Backend)/lib/dbConnect";
import { verifyAdmin } from "@/app/(Backend)/middlewares/IsAdmin";
import { verifyToken } from "@/app/(Backend)/middlewares/verifyToken";
export async function GET(request) {
  try {
    // Auth & Admin check
    const user = await verifyToken(request);
    if (!user)
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );

    const admin = await verifyAdmin(request);
    if (!admin)
      return Response.json(
        { success: false, message: "Forbidden" },
        { status: 403 },
      );

    const parcelCollection = await getParcels();

    // MongoDB Aggregation Pipeline
    const pipeline = [
      {
        $facet: {
          // ডেলিভারি স্ট্যাটাস অনুযায়ী গ্রুপিং
          deliveryStats: [
            {
              $group: {
                _id: "$DeliveryStatus",
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                status: { $ifNull: ["$_id", "pending"] },
                count: 1,
                _id: 0,
              },
            },
          ],
          // পেমেন্ট স্ট্যাটাস অনুযায়ী গ্রুপিং
          paymentStats: [
            {
              $group: {
                _id: "$paymentStatus", // আপনার ডাটাবেজে ফিল্ডের নাম যা আছে (e.g. paymentStatus)
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                status: { $ifNull: ["$_id", "unpaid"] },
                count: 1,
                _id: 0,
              },
            },
          ],
        },
      },
    ];

    const result = await parcelCollection.aggregate(pipeline).toArray();

    return Response.json({
      success: true,
      total: result,
    });
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

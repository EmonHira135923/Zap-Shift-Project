import { getParcels } from "@/app/(Backend)/lib/dbConnect";
import { verifyToken } from "@/app/(Backend)/middlewares/verifyToken";

export async function GET(request) {
  try {
    const user = await verifyToken(request);

    if (!user) {
      return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const parcelCollection = await getParcels();

    const pipeline = [
      {
        // Filter by the logged-in user's email (Sender)
        $match: {
          senderEmail: user.email, 
        },
      },
      {
        $facet: {
          // Payment Stats
          paymentStats: [
            {
              $group: {
                _id: null,
                paid: { $sum: { $cond: [{ $eq: ["$paymentStatus", "paid"] }, 1, 0] } },
                unpaid: { $sum: { $cond: [{ $eq: ["$paymentStatus", "unpaid"] }, 1, 0] } },
              },
            },
          ],
          // Delivery Stats
          deliveryStats: [
            {
              $group: {
                _id: null,
                delivered: { $sum: { $cond: [{ $eq: ["$DeliveryStatus", "delivered"] }, 1, 0] } },
                pending: { $sum: { $cond: [{ $eq: ["$DeliveryStatus", "pending"] }, 1, 0] } },
              },
            },
          ],
        },
      },
      {
        $project: {
          payment: { $arrayElemAt: ["$paymentStats", 0] },
          delivery: { $arrayElemAt: ["$deliveryStats", 0] },
        },
      },
    ];

    const result = await parcelCollection.aggregate(pipeline).toArray();

    // Formatting defaults so Recharts doesn't crash if data is 0
    const stats = result[0] || {};
    
    return Response.json({
      success: true,
      data: {
        paid: stats.payment?.paid || 0,
        unpaid: stats.payment?.unpaid || 0,
        delivered: stats.delivery?.delivered || 0,
        pending: stats.delivery?.pending || 0,
      }
    });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
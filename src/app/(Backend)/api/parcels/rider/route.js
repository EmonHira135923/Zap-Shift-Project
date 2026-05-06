import { getParcels } from "@/app/(Backend)/lib/dbConnect";

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export async function GET(request) {
  try {
    const parcelCollection = await getParcels();

    const { searchParams } = new URL(request.url);

    const riderEmail = searchParams.get("riderEmail");
    const DeliveryStatus = searchParams.get("DeliveryStatus");
    const paymentStatus = searchParams.get("paymentStatus");
    const search = searchParams.get("search");

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const query = {};

    if (riderEmail) {
      query.riderEmail = riderEmail;
    }

    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }

    if (DeliveryStatus) {
      const statuses = DeliveryStatus.split(",")
        .map((status) => status.trim())
        .filter(Boolean);

      query.DeliveryStatus = {
        $in: statuses.map((status) => new RegExp(`^${escapeRegex(status)}$`, "i")),
      };
    }

    if (search) {
      query.$or = [
        { trackingId: { $regex: search, $options: "i" } },
        { parcelName: { $regex: search, $options: "i" } },
        { receiverName: { $regex: search, $options: "i" } },
        { receiverPhone: { $regex: search, $options: "i" } },
        { receiverDistrict: { $regex: search, $options: "i" } },
        { receiverAddress: { $regex: search, $options: "i" } },
      ];
    }

    const result = await parcelCollection
      .find(query)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await parcelCollection.countDocuments(query);

    return Response.json({
      success: true,
      data: result,
      total,
      page,
      limit,
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

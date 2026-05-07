import { getTracking } from "@/app/(Backend)/lib/dbConnect";

export async function GET(request, { params }) {
  try {
    const { trackingId } = await params;

    if (!trackingId) {
      return Response.json(
        { success: false, message: "Tracking ID is required" },
        { status: 400 }
      );
    }

    const TrackingsCollection = await getTracking();

    // নির্দিষ্ট trackingId অনুযায়ী কুয়েরি
    const query = { trackingId: trackingId };

    // ডেটা খোঁজা (সাধারণত লগগুলো রিসেন্ট থেকে ওল্ড শর্টিংয়ে থাকে)
    const result = await TrackingsCollection.find(query)
      .sort({ "createdAt": -1 }) 
      .toArray();

    if (!result || result.length === 0) {
      return Response.json(
        { success: false, message: "No tracking logs found for this ID" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      trackingId,
      data: result,
    });
  } catch (err) {
    console.error("API Error:", err);
    return Response.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
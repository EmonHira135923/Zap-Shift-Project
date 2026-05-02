import { getParcels } from "@/app/(Backend)/lib/dbConnect";
import { verifyToken } from "@/app/(Backend)/middlewares/verifyToken";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  try {
    const user = await verifyToken();

    if (!user) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;
    const parcelCollection = await getParcels();
    const result = await parcelCollection.findOne({ _id: new ObjectId(id) });

    if (!result) {
      return Response.json(
        { success: false, message: "Parcel not found" },
        { status: 404 },
      );
    }

    return Response.json({ success: true, result });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const user = await verifyToken();

    if (!user) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    const { id } = await params;
    const body = await request.json();
    const parcelCollection = await getParcels();

    // ১. Sender-er sensitive info block kora (Security)
    const { senderName, senderEmail, senderPhone, _id, ...updateData } = body;

    // ২. Database Update
    // Frontend theke asha data-te ekhon cost, parcelWeight sob thakbe
    const result = await parcelCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateData, // Ekhane cost: liveCost auto chole asbe
          updatedAt: new Date(),
        },
      },
    );

    if (result.matchedCount === 0) {
      return Response.json(
        { success: false, message: "Parcel not found" },
        { status: 404 },
      );
    }

    return Response.json({
      success: true,
      message: "Parcel updated successfully!",
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = await verifyToken();

    if (!user) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    const parcelCollections = await getParcels();

    // params-ke await kora dorkar .js-er current version e
    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!id) {
      return Response.json(
        { success: false, message: "ID is required" },
        { status: 400 },
      );
    }

    // ObjectId valid kina check kora bhalo error avoid korar jonno
    if (!ObjectId.isValid(id)) {
      return Response.json(
        { success: false, message: "Invalid ID format" },
        { status: 400 },
      );
    }

    const query = { _id: new ObjectId(id) };
    const result = await parcelCollections.deleteOne(query);

    if (result.deletedCount === 1) {
      return Response.json(
        { success: true, message: "Parcel deleted successfully" },
        { status: 200 },
      );
    } else {
      return Response.json(
        { success: false, message: "No parcel found with this ID" },
        { status: 404 },
      );
    }
  } catch (err) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

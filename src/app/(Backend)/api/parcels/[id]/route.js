import { getParcels } from "@/app/(Backend)/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function DELETE(request, { params }) {
  try {
    const parcelCollections = await getParcels();
    
    // params-ke await kora dorkar Next.js-er current version e
    const resolvedParams = await params; 
    const id = resolvedParams.id; 

    if (!id) {
      return Response.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    // ObjectId valid kina check kora bhalo error avoid korar jonno
    if (!ObjectId.isValid(id)) {
      return Response.json(
        { success: false, message: "Invalid ID format" },
        { status: 400 }
      );
    }

    const query = { _id: new ObjectId(id) };
    const result = await parcelCollections.deleteOne(query);

    if (result.deletedCount === 1) {
      return Response.json(
        { success: true, message: "Parcel deleted successfully" },
        { status: 200 }
      );
    } else {
      return Response.json(
        { success: false, message: "No parcel found with this ID" },
        { status: 404 }
      );
    }
  } catch (err) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
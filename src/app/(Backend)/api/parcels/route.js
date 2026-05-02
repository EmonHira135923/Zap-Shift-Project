import { getParcels } from "../../lib/dbConnect";
import { verifyToken } from "../../middlewares/verifyToken";

export async function GET(request) {
  try {
    const user = await verifyToken();

    if (!user) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const parcelCollections = await getParcels();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const query = {};
    if (email) {
      query.senderEmail = email;
    }
    // console.log(query.senderEmail);

    const options = { sort: { createdAt: -1 } };

    const result = await parcelCollections.find(query, options).toArray();
    return Response.json({ success: true, message: result }, { status: 200 });
  } catch (err) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const user = await verifyToken();
    if (!user) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    const parcelCollections = await getParcels();
    const body = await request.json();
    const newParcel = {
      ...body,
      createdAt: new Date(),
      updatedAt: null,
    };
    const result = await parcelCollections.insertOne(newParcel);
    return Response.json({ success: true, message: result }, { status: 200 });
  } catch (err) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

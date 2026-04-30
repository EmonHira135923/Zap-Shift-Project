import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getUsers } from "@/app/(Backend)/lib/dbConnect";
import { connectCloudinary } from "@/app/(Backend)/lib/connectCloudinary";

export async function PATCH(request, { params }) {
  try {
    await connectCloudinary();
    const { id } = await params; // ✅ fix
    const body = await request.json();


    // 🔐 Token Check
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    try {
      jwt.verify(token, process.env.NEXTAUTH_SECRET);
    } catch (err) {
      return Response.json(
        { success: false, message: "Invalid token" },
        { status: 401 },
      );
    }

    const userCollection = await getUsers();

    const existingUser = await userCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!existingUser) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    // 🧹 OLD IMAGE DELETE (FIXED 🔥)
    if (
      body.image &&
      existingUser.image &&
      body.image !== existingUser.image &&
      existingUser.image.includes("res.cloudinary.com")
    ) {
      try {
        const url = existingUser.image;

        // full publicId with folder
        const publicId = url.split("/upload/")[1].split(".")[0];

        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error("Cloudinary Delete Error:", error.message);
      }
    }

    // 📝 UPDATE DATA
    const updateDoc = {
      $set: {
        ...(body.name && { name: body.name }),
        ...(body.phone && { phone: body.phone }),
        ...(body.image && { image: body.image }),
        updatedAt: new Date(),
      },
    };

    await userCollection.updateOne({ _id: new ObjectId(id) }, updateDoc);

    return Response.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

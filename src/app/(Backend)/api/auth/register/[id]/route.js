import { getUsers } from "@/app/(Backend)/lib/dbConnect";
import { ObjectId } from "mongodb";
import cloudinary from "cloudinary";
import { connectCloudinary } from "@/app/(Backend)/lib/connectCloudinary";

// ১. GET USER DETAILS
export async function GET(request, { params }) {
  try {
    const { id } = await params; // Next.js 15+ এ params await করতে হয়

    if (!ObjectId.isValid(id)) {
      return Response.json({ message: "Invalid ID format" }, { status: 400 });
    }

    const usersCollection = await getUsers();
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const { password, ...userData } = user;
    return Response.json({ message: userData }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// ২. UPDATE USER ROLE (PATCH)
export async function PATCH(request, { params }) {
  try {
    const usersCollection = await getUsers();
    const { role } = await request.json(); // বডি থেকে শুধু রোল নিন
    const { id } = await params; // ইউআরএল থেকে আইডি নিন

    if (!id || !role || !ObjectId.isValid(id)) {
      return Response.json(
        { message: "Valid ID and Role are required" },
        { status: 400 },
      );
    }

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { role, updatedAt: new Date() } },
    );

    if (result.matchedCount === 0) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    return Response.json(
      { message: "Role updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// ৩. DELETE USER (DELETE)
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    if (!id || !ObjectId.isValid(id)) {
      return Response.json(
        { message: "Invalid or missing ID" },
        { status: 400 },
      );
    }

    await connectCloudinary();
    const usersCollection = await getUsers();

    // যাকে ডিলিট করা হবে তাকে খুঁজে বের করা
    const targetUser = await usersCollection.findOne({ _id: new ObjectId(id) });

    if (!targetUser) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    if (targetUser.role === "admin") {
      return Response.json(
        { message: "You cannot delete an Admin account!" },
        { status: 403 },
      );
    }

    // --- ক্লাউডিনারি ইমেজ ডিলিট লজিক ---
    let publicIdToDelete = targetUser?.public_id;

    if (!publicIdToDelete && targetUser?.image) {
      const parts = targetUser.image.split("/");
      const fileNameWithExtension = parts.pop();
      const folderPath = parts.slice(parts.indexOf("upload") + 2).join("/");
      const fileName = fileNameWithExtension.split(".")[0];
      publicIdToDelete = folderPath ? `${folderPath}/${fileName}` : fileName;
    }

    if (publicIdToDelete) {
      await cloudinary.v2.uploader.destroy(publicIdToDelete);
    }

    // ৩. ডাটাবেস থেকে ডিলিট করা
    const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return Response.json(
        { message: "User and associated image deleted successfully" },
        { status: 200 },
      );
    }

    return Response.json({ message: "Delete failed" }, { status: 500 });
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 },
    );
  }
}

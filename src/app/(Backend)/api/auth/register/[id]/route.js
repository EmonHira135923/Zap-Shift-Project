import { getUsers } from "@/app/(Backend)/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const usersCollection = await getUsers();

    const user = await usersCollection.findOne({ _id: new ObjectId(id) });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    // Return the user data (excluding password for security)
    const { password, ...userData } = user;
    return Response.json({ message: userData }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// UPDATE USER ROLE (PATCH)
export async function PATCH(request) {
  try {
    const usersCollection = await getUsers();
    const { id, role } = await request.json();

    if (!id || !role) {
      return Response.json(
        { message: "ID and Role are required" },
        { status: 400 },
      );
    }

    const filter = { _id: new ObjectId(id) };
    const updateDoc = {
      $set: {
        role: role,
        updatedAt: new Date(),
      },
    };

    const result = await usersCollection.updateOne(filter, updateDoc);

    if (result.modifiedCount === 0) {
      return Response.json(
        { message: "User not found or role unchanged" },
        { status: 404 },
      );
    }

    return Response.json(
      { message: "Role updated successfully", result },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 },
    );
  }
}

// DELETE USER (DELETE)
export async function DELETE(request) {
  try {
    const usersCollection = await getUsers();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id"); // Get ID from query params like ?id=...

    if (!id) {
      return Response.json({ message: "User ID is required" }, { status: 400 });
    }

    const query = { _id: new ObjectId(id) };
    const result = await usersCollection.deleteOne(query);

    if (result.deletedCount === 0) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    return Response.json(
      { message: "User deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 },
    );
  }
}

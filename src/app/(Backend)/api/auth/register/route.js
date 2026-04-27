// Register API Route
import { getUsers } from "../../../lib/dbConnect";
import bcrypt from "bcrypt";

// Get Method
export async function GET(request) {
  try {
    const usersCollection = await getUsers();
    const result = await usersCollection.find({}).toArray();
    console.log(result);
    return Response.json({
      success: true,
      message: result,
      status: 200,
    });
  } catch (err) {
    return Response.json({
      success: false,
      error: err.message,
      status: 500,
    });
  }
}

// Post Method
export async function POST(request) {
  try {
    const usersCollection = await getUsers();
    const body = await request.json();
    // console.log(body);
    const { name, email, password, image, phone } = body;

    if (!name || !email || !password || !image || !phone) {
      return Response.json(
        {
          success: false,
          message:
            "Missing required fields (name, email, password, image, or phone)",
        },
        { status: 400 },
      );
    }

    // 1. Existing User Check (Unique Email Validation)
    const isExist = await usersCollection.findOne({ email });
    if (isExist) {
      return Response.json(
        { success: false, message: "User already exists with this email" },
        { status: 400 },
      );
    }

    // 2. Exiting User Check (Unique Name Validation)
    const isNameExist = await usersCollection.findOne({ name });
    if (isNameExist) {
      return Response.json(
        { success: false, message: "User already exists with this name" },
        { status: 400 },
      );
    }

    // 3. Existing User Check (Unique Phone Validation)
    if (phone) {
      const isPhoneExist = await usersCollection.findOne({ phone });
      if (isPhoneExist) {
        return Response.json(
          {
            success: false,
            message: "User already exists with this phone number",
          },
          { status: 400 },
        );
      }
    }

    // 4. Password Hashing
    const hasedpassword = await bcrypt.hash(password, 10);

    // 5. Insert New User
    const newUser = {
      name,
      email,
      password: hasedpassword,
      image,
      phone,
      role: "user",
      createdAt: new Date(),
      updatedAt: null,
    };

    const result = await usersCollection.insertOne(newUser);

    // console.log(result);
    return Response.json({
      success: true,
      message: result,
      status: 200,
    });
  } catch (err) {
    // console.error("Backend Error:", err);
    return Response.json({
      success: false,
      error: err.message,
      status: 500,
    });
  }
}

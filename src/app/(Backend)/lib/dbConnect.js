import { MongoClient, ServerApiVersion } from "mongodb";

// uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@zap-shift-project.ydnyv8l.mongodb.net/?appName=zap-shift-project`;

// client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// db and collection
let db;

export const connectDB = async () => {
  try {
    await client.connect();
    db = client.db("ZAP-SHIFT-PROJECT");
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
    return db;
  } catch (err) {
    console.error("Mongodb not connected", err.message);
    throw new Error("Database connection failed");
  }
};

// Users
export const getUsers = async () => {
  const database = await connectDB();
  return database.collection("users");
};

// Parcels
export const getParcels = async () => {
  const database = await connectDB();
  return database.collection("Parcels");
};

// Payment
export const getPayments = async () => {
  const database = await connectDB();
  return database.collection("Payments");
};
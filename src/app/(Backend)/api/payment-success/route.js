import { ObjectId } from "mongodb";
import Stripe from "stripe";
import { getParcels, getPayments } from "../../lib/dbConnect";
import { generateTrackingId } from "../../lib/generateTrackingId";
import { verifyToken } from "../../middlewares/verifyToken";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function PATCH(request) {
  try {
    // ১. রিকোয়েস্ট থেকে সেশন আইডি সংগ্রহ
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return Response.json({ error: "No session ID found" }, { status: 400 });
    }

    // ২. স্ট্রাইপ থেকে পেমেন্ট সেশন রিট্রিভ করা
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // ৩. পেমেন্ট স্ট্যাটাস চেক করা
    if (session.payment_status !== "paid") {
      return Response.json(
        { success: false, message: "Not paid" },
        { status: 400 },
      );
    }

    // ৪. সেশন মেটাডাটা এবং প্রয়োজনীয় ভেরিয়েবল তৈরি
    const { parcelId, customer, phone, parcelName } = session.metadata;
    const newTrackingId = generateTrackingId();

    // ৫. ডাটাবেস কালেকশন কানেক্ট করা
    const paymentsCollection = await getPayments();
    const parcelsCollection = await getParcels();

    // ৬. পেমেন্ট রেকর্ডের ডাটা অবজেক্ট তৈরি
    const paymentRecord = {
      parcelId,
      transactionId: session.payment_intent,
      amount: session.amount_total / 100,
      customerName: customer,
      currency: session.currency,
      parcelName: parcelName,
      customer_phone: phone,
      customer_email: session.customer_email,
      trackingId: newTrackingId,
      paymentStatus: "paid",
      paidAt: new Date(),
    };

    // ৭. পার্সেল আপডেটের ডাটা অবজেক্ট তৈরি
    const parcelUpdate = {
      $set: {
        paymentStatus: "paid",
        trackingId: newTrackingId,
        transactionId: session.payment_intent,
        DeliveryStatus: "pending pickup",
        updatedAt: new Date(),
      },
    };

    // ৮. ডাটাবেসে পেমেন্ট ডাটা সেভ করা
    if (session.payment_status == "paid") {
      await paymentsCollection.insertOne(paymentRecord);
    }

    // ৯. পার্সেল কালেকশনে তথ্য আপডেট করা
    const result = await parcelsCollection.updateOne(
      { _id: new ObjectId(parcelId) },
      parcelUpdate,
    );

    // ১০. সাকসেস রেসপন্স পাঠানো
    return Response.json(
      {
        success: true,
        message: "Payment history saved & Parcel card updated",
        trackingId: newTrackingId,
        transactionId: session.payment_intent,
        result: result,
      },
      { status: 200 },
    );
  } catch (error) {
    // ১১. এরর হ্যান্ডলিং
    console.error("Error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const user = await verifyToken(request);

    if (!user || !user.email) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page")) || 1;

    const limit = 10;
    const skip = (page - 1) * limit;

    const paymentsCollections = await getPayments();

    const query = {
      customer_email: user.email,
    };

    if (search) {
      query.$or = [
        { transactionId: { $regex: search, $options: "i" } },
        { parcelName: { $regex: search, $options: "i" } },
        { customerName: { $regex: search, $options: "i" } },
        { customer_phone: { $regex: search, $options: "i" } },
        { paymentStatus: { $regex: search, $options: "i" } },
      ];
    }

    const result = await paymentsCollections
      .find(query)
      .sort({ paidAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await paymentsCollections.countDocuments(query);

    return Response.json({
      success: true,
      result,
      total,
      page,
      limit,
    });
  } catch (err) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

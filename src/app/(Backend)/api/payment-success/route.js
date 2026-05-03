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
      paidAt: new Date(),
    };

    // ৭. পার্সেল আপডেটের ডাটা অবজেক্ট তৈরি
    const parcelUpdate = {
      $set: {
        paymentStatus: "paid",
        trackingId: newTrackingId,
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
    const user = await verifyToken();
    console.log("Verified User from Token:", user); // চেক করুন ইমেইল আছে কি না

    if (!user || !user.email) {
      return Response.json(
        { success: false, message: "Unauthorized: No email found in token" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const emailFromQuery = searchParams.get("email");
    console.log("Email from URL Query:", emailFromQuery);

    // সিকিউরিটি চেক: কুয়েরি ইমেইল আর টোকেন ইমেইল এক কি না
    if (emailFromQuery && emailFromQuery !== user.email) {
      console.warn("Security Alert: Email mismatch!");
    }

    const paymentsCollections = await getPayments();

    // টোকেনের ইমেইল ব্যবহার করাই সবচেয়ে নিরাপদ
    const result = await paymentsCollections
      .find({ customer_email: user.email })
      .sort({ paidAt: -1 })
      .toArray();

    console.log(`Found ${result.length} payments for: ${user.email}`);

    return Response.json({ success: true, result: result }, { status: 200 });
  } catch (err) {
    console.error("Backend Error:", err.message);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

import { ObjectId } from "mongodb";
import Stripe from "stripe";
import { getParcels, getPayments } from "../../lib/dbConnect";
import { generateTrackingId } from "../../lib/generateTrackingId";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function PATCH(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return Response.json({ error: "No session ID found" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return Response.json({ success: false, message: "Not paid" }, { status: 400 });
    }

    const { parcelId, customer, phone, parcelName } = session.metadata;
    const newTrackingId = generateTrackingId();

    // ১. পেমেন্টের বিস্তারিত ডাটা (যা Payments কালেকশনে যাবে)
    const paymentRecord = {
      parcelId,
      transactionId: session.payment_intent,
      amount: session.amount_total / 100,
      customerName: customer,
      email: session.customer_email,
      date: new Date(),
    };

    // ২. পার্সেলের আপডেট ডাটা (যা Parcels কালেকশনে যাবে)
    const parcelUpdate = {
      $set: {
        paymentStatus: "paid",
        trackingId: newTrackingId,
        transactionId: session.payment_intent,
        updatedAt: new Date(),
      },
    };

    const paymentsCollection = await getPayments();
    const parcelsCollection = await getParcels();

    // ৩. দুইটা ডাটাবেস অপারেশন একসাথে রান করা
    await paymentsCollection.insertOne(paymentRecord); // পেমেন্ট হিস্টোরি সেভ হলো
    const result = await parcelsCollection.updateOne(  // পার্সেল কার্ড আপডেট হলো
      { _id: new ObjectId(parcelId) },
      parcelUpdate
    );

    return Response.json({
        success: true,
        message: "Payment history saved & Parcel card updated",
        trackingId: newTrackingId,
        transactionId: session.payment_intent,
        result: result,
      }, { status: 200 });

  } catch (error) {
    console.error("Error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
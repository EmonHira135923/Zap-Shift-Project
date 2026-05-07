import Stripe from "stripe";
import { generateTrackingId } from "../../lib/generateTrackingId";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    // ১. অ্যামাউন্ট ভ্যালিডেশন
    const amount = Math.round(Number(body.cost) * 100);
    if (!amount || isNaN(amount)) {
      return Response.json({ error: "Invalid amount" }, { status: 400 });
    }

    // ২. Tracking ID নিশ্চিত করা
    // যদি ফ্রন্টএন্ড থেকে আইডি না আসে, তবে ব্যাকএন্ডে জেনারেট করা হবে
    const finalTrackingId = body.trackingId || generateTrackingId();

    const appUrl = process.env.NEXT_AUTH_URL;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: amount,
            product_data: {
              name: body.parcelName || "Parcel Delivery",
              description: `Tracking ID: ${finalTrackingId}`, // ইনভয়েসে আইডি দেখানোর জন্য
            },
          },
          quantity: 1,
        },
      ],
      customer_email: body.senderEmail,
      mode: "payment",
      metadata: {
        parcelId: body.parcelId,
        parcelName: body.parcelName,
        customer: body.senderName,
        phone: String(body.phone || ""),
        trackingId: finalTrackingId, // এখানে নিশ্চিতভাবে ভ্যালু যাচ্ছে
      },
      success_url: `${appUrl}/dashboard/payment/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/dashboard/payment/payment-cancel`,
    });

    console.log("Checkout Session Created with ID:", finalTrackingId);

    return Response.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Error:", err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
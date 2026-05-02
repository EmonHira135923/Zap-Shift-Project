import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    // Amount calculate korar somoy safe thaka bhalo
    const amount = Math.round(Number(body.cost) * 100);
    
    if (!amount || isNaN(amount)) {
      return Response.json({ error: "Invalid amount" }, { status: 400 });
    }

    // URL-ta env theke nibe, na thakle localhost (development er jonno)
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
      },
      success_url: `${appUrl}/dashboard/payment/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/dashboard/payment/payment-cancel`,
    });

    // Ekhane 'session' hobe, 'paymentinfo' noy
    console.log("Checkout Session Created:", session);

    return Response.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Error:", err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { insertSubscription } from "@/db";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  if (process.env.STRIPE_WEBHOOK_SECRET && signature) {
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  } else {
    event = JSON.parse(body) as Stripe.Event;
  }

  // Handle completed checkout sessions
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    await insertSubscription({
      stripeSessionId: session.id,
      stripeCustomerId: typeof session.customer === "string" ? session.customer : null,
      stripeSubscriptionId: typeof session.subscription === "string" ? session.subscription : null,
      customerEmail: session.customer_details?.email || null,
      customerName: session.customer_details?.name || null,
      amountTotal: session.amount_total,
      currency: session.currency || "usd",
      status: session.payment_status || "paid",
    });
  }

  return NextResponse.json({ received: true });
}

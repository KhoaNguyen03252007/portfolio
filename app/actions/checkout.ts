"use server";

import { getStripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function createCheckoutSession(priceId?: string) {
  const targetPriceId = priceId || process.env.STRIPE_PRICE_ID;

  if (!targetPriceId) {
    throw new Error("STRIPE_PRICE_ID is not configured in .env");
  }

  const stripe = getStripe();
  const headerList = await headers();
  const origin = headerList.get("origin") || "http://localhost:3000";

  // Check if the price is a recurring subscription or a one-time payment
  const price = await stripe.prices.retrieve(targetPriceId);
  const mode = price.type === "recurring" ? "subscription" : "payment";

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: targetPriceId,
        quantity: 1,
      },
    ],
    mode: mode,
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cancel`,
  });

  if (session.url) {
    redirect(session.url);
  }
}

export async function createServiceCheckout({
  serviceName,
  description,
  amountInDollars,
  isSubscription = false,
  priceId,
}: {
  serviceName: string;
  description: string;
  amountInDollars: number;
  isSubscription?: boolean;
  priceId?: string;
}) {
  const stripe = getStripe();
  const headerList = await headers();
  const origin = headerList.get("origin") || "http://localhost:3000";

  // If a specific price ID is passed and valid, use that; otherwise generate price_data on the fly
  let line_items;
  let mode: "payment" | "subscription" = isSubscription ? "subscription" : "payment";

  if (priceId && priceId.startsWith("price_")) {
    line_items = [{ price: priceId, quantity: 1 }];
  } else {
    line_items = [
      {
        price_data: {
          currency: "usd",
          unit_amount: Math.round(amountInDollars * 100),
          product_data: {
            name: serviceName,
            description: description,
          },
          ...(isSubscription
            ? {
                recurring: {
                  interval: "month" as const,
                },
              }
            : {}),
        },
        quantity: 1,
      },
    ];
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode,
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cancel`,
  });

  if (session.url) {
    redirect(session.url);
  }
}

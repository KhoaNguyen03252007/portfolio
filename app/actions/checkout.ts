"use server";

import { getStripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function createCheckoutSession(priceId?: string) {
  const targetPriceId = priceId || process.env.STRIPE_PRICE_ID;
  const stripe = getStripe();
  const headerList = await headers();
  const origin = headerList.get("origin") || "https://portfolio-khoanguyen03252007.vercel.app";

  let line_items;
  let mode: "payment" | "subscription" = "subscription";

  if (targetPriceId && targetPriceId.startsWith("price_")) {
    try {
      const price = await stripe.prices.retrieve(targetPriceId);
      mode = price.type === "recurring" ? "subscription" : "payment";
      line_items = [{ price: targetPriceId, quantity: 1 }];
    } catch {
      // If price ID does not exist in live mode, gracefully fallback to on-demand subscription line item
      line_items = [
        {
          price_data: {
            currency: "usd",
            unit_amount: 999, // $9.99
            product_data: {
              name: "Khoa AI Pro Access",
              description: "VIP access to Khoa's private developer tools and templates",
            },
            recurring: { interval: "month" as const },
          },
          quantity: 1,
        },
      ];
      mode = "subscription";
    }
  } else {
    line_items = [
      {
        price_data: {
          currency: "usd",
          unit_amount: 999,
          product_data: {
            name: "Khoa AI Pro Access",
            description: "VIP access to Khoa's private developer tools and templates",
          },
          recurring: { interval: "month" as const },
        },
        quantity: 1,
      },
    ];
    mode = "subscription";
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
  const origin = headerList.get("origin") || "https://portfolio-khoanguyen03252007.vercel.app";

  let line_items;
  let mode: "payment" | "subscription" = isSubscription ? "subscription" : "payment";

  if (priceId && priceId.startsWith("price_")) {
    try {
      const price = await stripe.prices.retrieve(priceId);
      mode = price.type === "recurring" ? "subscription" : "payment";
      line_items = [{ price: priceId, quantity: 1 }];
    } catch {
      line_items = [
        {
          price_data: {
            currency: "usd",
            unit_amount: Math.round(amountInDollars * 100),
            product_data: {
              name: serviceName,
              description: description,
            },
            ...(isSubscription ? { recurring: { interval: "month" as const } } : {}),
          },
          quantity: 1,
        },
      ];
    }
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
          ...(isSubscription ? { recurring: { interval: "month" as const } } : {}),
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

import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

export function getStripe() {
  if (!stripeInstance) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY is missing from environment variables.");
    }
    stripeInstance = new Stripe(key, {
      typescript: true,
    });
  }
  return stripeInstance;
}

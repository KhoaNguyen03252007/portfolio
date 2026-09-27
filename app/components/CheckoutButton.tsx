"use client";

import { useTransition } from "react";
import { createCheckoutSession } from "@/app/actions/checkout";
import { Coffee, Loader2 } from "lucide-react";

export default function CheckoutButton({
  priceId,
  label = "Support / Buy me a coffee",
  className = "",
}: {
  priceId?: string;
  label?: string;
  className?: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleCheckout = () => {
    startTransition(async () => {
      await createCheckoutSession(priceId);
    });
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isPending}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-lg shadow-orange-500/25 hover:from-amber-600 hover:to-orange-600 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {isPending ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          <span>Connecting to Stripe...</span>
        </>
      ) : (
        <>
          <Coffee size={18} />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}

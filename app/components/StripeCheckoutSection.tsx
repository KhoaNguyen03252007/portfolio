"use client";

import { useTransition, useState } from "react";
import { CreditCard, ShieldCheck, Sparkles, Loader2, ArrowRight, Check, Coffee } from "lucide-react";
import Link from "next/link";
import { createCheckoutSession, createServiceCheckout } from "@/app/actions/checkout";

export default function StripeCheckoutSection() {
  const [isPending, startTransition] = useTransition();
  const [activeBtn, setActiveBtn] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubscriptionCheckout = () => {
    setActiveBtn("subscription");
    startTransition(async () => {
      await createCheckoutSession();
    });
  };

  const handleDollarCheckout = () => {
    setActiveBtn("dollar");
    startTransition(async () => {
      await createServiceCheckout({
        serviceName: "☕ Coffee Tip / $1 Real Test",
        description: "Test checkout transaction for $1.00 USD",
        amountInDollars: 1,
        isSubscription: false,
      });
    });
  };

  const copyCard = () => {
    navigator.clipboard.writeText("4242424242424242");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="section" id="support" style={{ position: "relative" }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge" id="stripe-badge">
            <CreditCard size={14} /> Stripe Payments &amp; Checkout
          </div>
          <h2 className="section-title" id="stripe-title">
            Test Checkout &amp; <span>Order Services</span>
          </h2>
          <p className="section-subtitle">
            Experience end-to-end checkout with instant test cards or real $1 payments.
          </p>
        </div>

        <div
          className="glass-panel"
          style={{
            maxWidth: "680px",
            margin: "0 auto",
            padding: "2.5rem 2rem",
            borderRadius: "1.25rem",
            background: "linear-gradient(135deg, rgba(20, 20, 35, 0.7), rgba(10, 10, 20, 0.9))",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
            textAlign: "center",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 12px",
              borderRadius: "999px",
              background: "rgba(99, 102, 241, 0.15)",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              color: "#a5b4fc",
              fontSize: "0.8rem",
              fontWeight: 600,
              marginBottom: "1.25rem",
            }}
          >
            <Sparkles size={14} /> Instant Stripe Checkout Ready
          </div>

          <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "0.75rem" }}>
            Choose a Payment to Test
          </h3>
          <p style={{ color: "var(--text-secondary, #94a3b8)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.75rem" }}>
            Choose the <strong>$1.00 Coffee / Real Card Test</strong> or subscribe to the <strong>$9.99 Pro Plan</strong>.
          </p>

          {/* Test Card Quick Helper Card */}
          <div
            style={{
              background: "rgba(15, 23, 42, 0.7)",
              border: "1px dashed rgba(99, 102, 241, 0.4)",
              borderRadius: "0.75rem",
              padding: "1rem 1.25rem",
              marginBottom: "1.75rem",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#94a3b8", fontWeight: 600 }}>
                Sandbox Test Card Helper
              </span>
              <button
                onClick={copyCard}
                style={{
                  background: "transparent",
                  border: "none",
                  color: copied ? "#34d399" : "#60a5fa",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {copied ? <Check size={12} /> : null}
                {copied ? "Copied!" : "Copy Number"}
              </button>
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.85rem", color: "#e2e8f0" }}>
              <div><strong style={{ color: "#94a3b8" }}>Test Card:</strong> <code style={{ color: "#38bdf8", fontWeight: 600 }}>4242 •••• •••• 4242</code></div>
              <div><strong style={{ color: "#94a3b8" }}>Exp:</strong> <code>12/34</code></div>
              <div><strong style={{ color: "#94a3b8" }}>CVC:</strong> <code>123</code></div>
              <div><strong style={{ color: "#94a3b8" }}>Zip:</strong> <code>90210</code></div>
            </div>
          </div>

          {/* Action Buttons Grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "1.5rem" }}>
            {/* $1 Test Button */}
            <button
              onClick={handleDollarCheckout}
              disabled={isPending}
              style={{
                width: "100%",
                padding: "1rem 1.5rem",
                borderRadius: "0.75rem",
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "1rem",
                border: "none",
                cursor: isPending ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.4)",
                transition: "all 0.2s ease",
                opacity: isPending && activeBtn !== "dollar" ? 0.6 : 1,
              }}
            >
              {isPending && activeBtn === "dollar" ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Redirecting to $1 Checkout...</span>
                </>
              ) : (
                <>
                  <Coffee size={20} />
                  <span>Test $1.00 USD Checkout (Coffee Tip)</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* $9.99 Subscription Button */}
            <button
              onClick={handleSubscriptionCheckout}
              disabled={isPending}
              style={{
                width: "100%",
                padding: "1rem 1.5rem",
                borderRadius: "0.75rem",
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "1rem",
                border: "none",
                cursor: isPending ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)",
                transition: "all 0.2s ease",
                opacity: isPending && activeBtn !== "subscription" ? 0.6 : 1,
              }}
            >
              {isPending && activeBtn === "subscription" ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Redirecting to Stripe...</span>
                </>
              ) : (
                <>
                  <CreditCard size={20} />
                  <span>Subscribe to Khoa AI Pro ($9.99/mo)</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* Link to Full Shop */}
            <Link
              href="/shop"
              style={{
                width: "100%",
                padding: "0.85rem 1.5rem",
                borderRadius: "0.75rem",
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#cbd5e1",
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <Sparkles size={16} style={{ color: "#818cf8" }} />
              <span>Browse All Website Creation Services ($149 - $1,299)</span>
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              color: "#64748b",
              fontSize: "0.75rem",
            }}
          >
            <ShieldCheck size={14} style={{ color: "#10b981" }} />
            <span>Encrypted with 256-bit Stripe Checkout</span>
          </div>
        </div>
      </div>
    </section>
  );
}

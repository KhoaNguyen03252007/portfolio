"use client";

import { useTransition, useState } from "react";
import { CreditCard, ShieldCheck, Sparkles, Loader2, ArrowRight, Check } from "lucide-react";
import { createCheckoutSession } from "@/app/actions/checkout";

export default function StripeCheckoutSection() {
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);

  const handleCheckout = () => {
    startTransition(async () => {
      await createCheckoutSession();
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
            <CreditCard size={14} /> Stripe Payments
          </div>
          <h2 className="section-title" id="stripe-title">
            Support My Work &amp; <span>Test Checkout</span>
          </h2>
          <p className="section-subtitle">
            Experience the live Stripe integration in sandbox mode. Test with instant virtual cards.
          </p>
        </div>

        <div
          className="glass-panel"
          style={{
            maxWidth: "680px",
            margin: "0 auto",
            padding: "2.5rem",
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
            <Sparkles size={14} /> Stripe Test Sandbox Active
          </div>

          <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "0.75rem" }}>
            Test Stripe Checkout Flow
          </h3>
          <p style={{ color: "var(--text-secondary, #94a3b8)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.75rem" }}>
            Click the button below to be redirected to the secure Stripe-hosted checkout page.
            Use any Stripe test card to simulate a real payment transaction.
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
                Test Card Helper
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
              <div><strong style={{ color: "#94a3b8" }}>Card:</strong> <code style={{ color: "#38bdf8", fontWeight: 600 }}>4242 •••• •••• 4242</code></div>
              <div><strong style={{ color: "#94a3b8" }}>Exp:</strong> <code>12/34</code></div>
              <div><strong style={{ color: "#94a3b8" }}>CVC:</strong> <code>123</code></div>
              <div><strong style={{ color: "#94a3b8" }}>Zip:</strong> <code>90210</code></div>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
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
              opacity: isPending ? 0.7 : 1,
            }}
          >
            {isPending ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Redirecting to Stripe...</span>
              </>
            ) : (
              <>
                <CreditCard size={20} />
                <span>Proceed to Stripe Checkout</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              marginTop: "1rem",
              color: "#64748b",
              fontSize: "0.75rem",
            }}
          >
            <ShieldCheck size={14} style={{ color: "#10b981" }} />
            <span>Encrypted with 256-bit Stripe Test Sandbox Encryption</span>
          </div>
        </div>
      </div>
    </section>
  );
}

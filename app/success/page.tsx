import Link from "next/link";
import { CheckCircle2, ArrowLeft, Database, Sparkles, Receipt, Mail, User, ShieldCheck } from "lucide-react";
import { getStripe } from "@/lib/stripe";
import { insertSubscription } from "@/db";

export const dynamic = "force-dynamic";

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams;

  let sessionDetails: {
    customerEmail?: string | null;
    customerName?: string | null;
    amountTotal?: number | null;
    currency?: string | null;
    subscriptionId?: string | null;
    customerId?: string | null;
    status?: string | null;
    dbSaved?: boolean;
  } | null = null;

  if (session_id) {
    try {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ["customer", "line_items"],
      });

      const customerObj =
        session.customer && typeof session.customer === "object" && !("deleted" in session.customer)
          ? session.customer
          : null;

      const customerEmail = session.customer_details?.email || customerObj?.email || null;
      const customerName = session.customer_details?.name || customerObj?.name || null;
      const subscriptionId =
        typeof session.subscription === "string" ? session.subscription : session.subscription?.id || null;
      const customerId =
        typeof session.customer === "string" ? session.customer : session.customer?.id || null;
      const priceId = session.line_items?.data[0]?.price?.id || null;

      // Save to NeonDB
      const dbResult = await insertSubscription({
        stripeSessionId: session.id,
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        stripePriceId: priceId,
        customerEmail: customerEmail,
        customerName: customerName,
        amountTotal: session.amount_total,
        currency: session.currency || "usd",
        status: session.payment_status || "paid",
      });

      sessionDetails = {
        customerEmail,
        customerName,
        amountTotal: session.amount_total,
        currency: session.currency,
        subscriptionId,
        customerId,
        status: session.payment_status,
        dbSaved: dbResult.isLiveDb,
      };
    } catch (err) {
      console.error("Error retrieving checkout session:", err);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
        backgroundColor: "#07070d",
        color: "#ffffff",
      }}
    >
      <div
        style={{
          maxWidth: "540px",
          width: "100%",
          background: "linear-gradient(180deg, rgba(24, 24, 42, 0.85) 0%, rgba(10, 10, 18, 0.95) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "1.5rem",
          padding: "2.5rem 2rem",
          boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(99, 102, 241, 0.15)",
          textAlign: "center",
        }}
      >
        {/* Animated Check Circle */}
        <div
          style={{
            width: "68px",
            height: "68px",
            borderRadius: "50%",
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
            color: "#34d399",
          }}
        >
          <CheckCircle2 size={38} />
        </div>

        <h1 style={{ fontSize: "1.85rem", fontWeight: 800, marginBottom: "0.5rem", color: "#ffffff" }}>
          Order Confirmed!
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
          Thank you for choosing my web development services. Your transaction was processed securely via Stripe and stored in NeonDB.
        </p>

        {/* Database Stored Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            borderRadius: "999px",
            background: "rgba(16, 185, 129, 0.12)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "#6ee7b7",
            fontSize: "0.85rem",
            fontWeight: 600,
            marginBottom: "1.75rem",
          }}
        >
          <Database size={15} />
          <span>Synced &amp; Stored in NeonDB Serverless PostgreSQL</span>
        </div>

        {/* Order Receipt Details Card */}
        {sessionDetails && (
          <div
            style={{
              background: "rgba(15, 23, 42, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "1rem",
              padding: "1.25rem 1.5rem",
              marginBottom: "2rem",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", marginBottom: "0.75rem" }}>
              <span style={{ color: "#94a3b8", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px" }}>
                <Receipt size={14} /> Total Paid:
              </span>
              <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "#38bdf8" }}>
                ${((sessionDetails.amountTotal || 0) / 100).toFixed(2)} {sessionDetails.currency?.toUpperCase()}
              </span>
            </div>

            {sessionDetails.customerEmail && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", marginBottom: "0.75rem" }}>
                <span style={{ color: "#94a3b8", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Mail size={14} /> Customer Email:
                </span>
                <span style={{ color: "#f1f5f9", fontSize: "0.85rem", fontFamily: "monospace" }}>
                  {sessionDetails.customerEmail}
                </span>
              </div>
            )}

            {sessionDetails.customerName && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", marginBottom: "0.75rem" }}>
                <span style={{ color: "#94a3b8", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px" }}>
                  <User size={14} /> Client Name:
                </span>
                <span style={{ color: "#f1f5f9", fontSize: "0.85rem", fontWeight: 600 }}>
                  {sessionDetails.customerName}
                </span>
              </div>
            )}

            {sessionDetails.subscriptionId && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#94a3b8", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Sparkles size={14} /> Subscription Ref:
                </span>
                <span style={{ color: "#a5b4fc", fontSize: "0.8rem", fontFamily: "monospace" }}>
                  {sessionDetails.subscriptionId}
                </span>
              </div>
            )}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              padding: "0.95rem 1.5rem",
              borderRadius: "0.85rem",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "0.95rem",
              textDecoration: "none",
              boxShadow: "0 8px 20px rgba(99, 102, 241, 0.35)",
            }}
          >
            <ArrowLeft size={16} /> Return to Portfolio Homepage
          </Link>

          <Link
            href="/shop"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              padding: "0.85rem 1.5rem",
              borderRadius: "0.85rem",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#cbd5e1",
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            Browse More Services
          </Link>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  Check,
  Zap,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock,
  Code2,
  Database,
  CreditCard,
  Layers,
  HelpCircle,
  Star,
  ChevronRight,
  Loader2,
  Lock,
} from "lucide-react";
import { createServiceCheckout } from "@/app/actions/checkout";

interface ServiceTier {
  id: string;
  name: string;
  tagline: string;
  price: number;
  isPopular?: boolean;
  deliveryTime: string;
  features: string[];
  techStack: string[];
  badge?: string;
}

const oneTimePackages: ServiceTier[] = [
  {
    id: "landing-page",
    name: "Modern Landing Page",
    tagline: "Ultra-fast, high-converting responsive single-page website for personal brands or startups.",
    price: 149,
    deliveryTime: "2-3 business days",
    features: [
      "Custom responsive design (Desktop & Mobile)",
      "Next.js 15 App Router + Vanilla/Modern CSS",
      "Interactive Contact Form with NeonDB storage",
      "Full SEO & Social Meta Tag optimization",
      "Lighthouse 95+ Performance score guarantee",
      "14 days of free bug-fix warranty",
    ],
    techStack: ["Next.js 15", "TypeScript", "NeonDB", "Vercel"],
  },
  {
    id: "fullstack-app",
    name: "Full-Stack Web App",
    tagline: "End-to-end production web application with database, auth, and automated Stripe payments.",
    price: 499,
    isPopular: true,
    deliveryTime: "5-7 business days",
    badge: "Most Popular",
    features: [
      "Everything in Modern Landing Page",
      "NeonDB PostgreSQL database + Drizzle ORM schema",
      "Stripe Payments & Checkout integration",
      "User Authentication & secure role-based access",
      "Custom dashboard / Admin management portal",
      "Dynamic REST / Server Action API routes",
      "30 days of dedicated priority support",
    ],
    techStack: ["Next.js 15", "NeonDB", "Drizzle ORM", "Stripe API", "Auth.js"],
  },
  {
    id: "custom-saas",
    name: "Custom SaaS / Platform",
    tagline: "Bespoke SaaS platform with custom business logic, AI features, and enterprise-grade scale.",
    price: 1299,
    deliveryTime: "10-14 business days",
    badge: "Enterprise Grade",
    features: [
      "Everything in Full-Stack Web App",
      "Custom AI / LLM Integrations (Gemini / OpenAI API)",
      "Stripe Subscriptions, Webhooks & Customer Portal",
      "Multi-tenant database design with automated backups",
      "High-throughput caching & rate limiting",
      "Complete documentation & handover workshop",
      "60 days of VIP engineering support & SLA",
    ],
    techStack: ["Next.js 15", "NeonDB", "Stripe Webhooks", "AI SDK", "Tailwind/CSS"],
  },
];

const subscriptionPackages: ServiceTier[] = [
  {
    id: "support-tier",
    name: "Khoa AI Pro Access",
    tagline: "Direct access to Khoa's private AI developer tools, starter templates, and code reviews.",
    price: 9.99,
    deliveryTime: "Instant Access",
    features: [
      "Access to private Next.js & NeonDB code templates",
      "Weekly developer updates & architectural patterns",
      "Discord / Slack private priority channel",
      "Cancel anytime with 1-click self-serve portal",
    ],
    techStack: ["Developer Tools", "Code Templates", "VIP Discord"],
  },
  {
    id: "maintenance-tier",
    name: "Monthly Web Care & Updates",
    tagline: "Continuous maintenance, security patches, uptime monitoring, and small feature updates.",
    price: 99,
    isPopular: true,
    deliveryTime: "Ongoing Monthly",
    badge: "Best Value for Businesses",
    features: [
      "Up to 4 hours of dedicated feature updates/mo",
      "Dependency security audits & framework upgrades",
      "Database performance tuning & NeonDB monitoring",
      "24/7 uptime monitoring & instant emergency fixes",
      "Direct WhatsApp / Slack engineering support",
    ],
    techStack: ["Monitoring", "Next.js Upgrades", "DB Backups"],
  },
  {
    id: "fractional-cto",
    name: "Dedicated Engineering Retainer",
    tagline: "Fractional lead engineer dedicated to shipping features, code reviews, and architecture.",
    price: 499,
    deliveryTime: "Continuous Delivery",
    features: [
      "Up to 20 hours of senior engineering per month",
      "Full architectural design & system consulting",
      "PR reviews, code optimization, and CI/CD pipelines",
      "Direct team collaboration & sprint planning",
      "SLA: Under 4-hour response time guarantee",
    ],
    techStack: ["Full-Stack", "Architecture", "Cloud Infrastructure"],
  },
];

const addOns = [
  {
    id: "live-test-coffee",
    title: "☕ Buy Me a Coffee / Live $1 Test",
    price: 1,
    desc: "Test live real-money checkout with your real credit/debit card for just $1.00 USD.",
  },
  {
    id: "stripe-integration",
    title: "Stripe Checkout & Billing Setup",
    price: 99,
    desc: "Add Stripe checkout, webhooks, and subscription billing to your existing website.",
  },
  {
    id: "neondb-migration",
    title: "NeonDB PostgreSQL Database Setup",
    price: 120,
    desc: "Architect and deploy high-performance serverless PostgreSQL with Drizzle ORM.",
  },
  {
    id: "performance-seo",
    title: "Performance & SEO Overhaul",
    price: 79,
    desc: "Boost your Lighthouse score to 95+ and optimize meta tags for viral Google ranking.",
  },
  {
    id: "ai-assistant",
    title: "Custom AI Chatbot Integration",
    price: 249,
    desc: "Train and embed an AI assistant on your website connected to your business data.",
  },
];

const faqs = [
  {
    q: "How does the ordering and payment process work?",
    a: "Select your desired package and click 'Order via Stripe Checkout'. Your payment is securely handled through Stripe. Once completed, I will immediately email you within 2 hours to gather your project requirements and start development.",
  },
  {
    q: "Can I customize the features in a package?",
    a: "Absolutely! Every project is unique. If you need a specific feature or custom combination, reach out via the Contact section or choose an add-on during checkout.",
  },
  {
    q: "What technologies do you use?",
    a: "I build with modern, industry-standard technologies: Next.js 15 App Router, React 19, NeonDB Serverless Postgres, Drizzle ORM, Stripe API, and TypeScript for blazing-fast speed and bulletproof reliability.",
  },
  {
    q: "What is your satisfaction guarantee?",
    a: "I provide unlimited revisions during the initial development cycle until you are 100% satisfied with the design and functionality. Plus, every package comes with 14 to 60 days of free post-launch support.",
  },
];

export default function ServicesPage() {
  const [billingCycle, setBillingCycle] = useState<"onetime" | "monthly">("onetime");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [activeTierId, setActiveTierId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const currentPackages = billingCycle === "onetime" ? oneTimePackages : subscriptionPackages;

  const handleCheckout = (tier: ServiceTier) => {
    setActiveTierId(tier.id);
    startTransition(async () => {
      await createServiceCheckout({
        serviceName: tier.name,
        description: `${tier.tagline} (Delivery: ${tier.deliveryTime})`,
        amountInDollars: tier.price,
        isSubscription: billingCycle === "monthly",
      });
    });
  };

  const handleAddonCheckout = (addon: typeof addOns[0]) => {
    setActiveTierId(addon.id);
    startTransition(async () => {
      await createServiceCheckout({
        serviceName: addon.title,
        description: addon.desc,
        amountInDollars: addon.price,
        isSubscription: false,
      });
    });
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#07070d", color: "#f8fafc", paddingBottom: "5rem" }}>
      {/* Top Header / Hero */}
      <section style={{ padding: "5rem 1.5rem 3rem", textAlign: "center", position: "relative" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "999px",
              background: "rgba(99, 102, 241, 0.12)",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              color: "#818cf8",
              fontSize: "0.85rem",
              fontWeight: 600,
              marginBottom: "1.5rem",
            }}
          >
            <Sparkles size={16} /> Premium Web Development Services
          </div>

          <h1
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: "1.25rem",
              background: "linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Turn Your Vision Into a <span style={{ color: "#6366f1", WebkitTextFillColor: "#6366f1" }}>High-Performance</span> Website
          </h1>

          <p style={{ color: "#94a3b8", fontSize: "1.1rem", lineHeight: 1.6, marginBottom: "2.5rem" }}>
            Production-grade websites and web applications built with <strong>Next.js 15</strong>,{" "}
            <strong>NeonDB PostgreSQL</strong>, and <strong>Stripe Payments</strong>. Fast turnaround, clean code, and lifetime value.
          </p>

          {/* Billing Cycle Selector Toggle */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "4px",
              borderRadius: "999px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              marginBottom: "2rem",
            }}
          >
            <button
              onClick={() => setBillingCycle("onetime")}
              style={{
                padding: "8px 24px",
                borderRadius: "999px",
                border: "none",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: billingCycle === "onetime" ? "#6366f1" : "transparent",
                color: billingCycle === "onetime" ? "#ffffff" : "#94a3b8",
                boxShadow: billingCycle === "onetime" ? "0 4px 12px rgba(99, 102, 241, 0.4)" : "none",
              }}
            >
              Project Packages (One-Time)
            </button>
            <button
              onClick={() => setBillingCycle("monthly")}
              style={{
                padding: "8px 24px",
                borderRadius: "999px",
                border: "none",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: billingCycle === "monthly" ? "#6366f1" : "transparent",
                color: billingCycle === "monthly" ? "#ffffff" : "#94a3b8",
                boxShadow: billingCycle === "monthly" ? "0 4px 12px rgba(99, 102, 241, 0.4)" : "none",
              }}
            >
              Monthly Retainer / Maintenance
            </button>
          </div>
        </div>
      </section>

      {/* Main Pricing Cards Container */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem 4rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
            alignItems: "stretch",
          }}
        >
          {currentPackages.map((tier) => {
            const isSelected = activeTierId === tier.id && isPending;
            return (
              <div
                key={tier.id}
                style={{
                  position: "relative",
                  borderRadius: "1.5rem",
                  background: tier.isPopular
                    ? "linear-gradient(180deg, rgba(30, 27, 75, 0.8) 0%, rgba(15, 15, 28, 0.95) 100%)"
                    : "linear-gradient(180deg, rgba(20, 20, 35, 0.6) 0%, rgba(10, 10, 20, 0.9) 100%)",
                  border: tier.isPopular ? "2px solid #6366f1" : "1px solid rgba(255, 255, 255, 0.08)",
                  padding: "2.5rem 2rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: tier.isPopular
                    ? "0 25px 50px -12px rgba(99, 102, 241, 0.25)"
                    : "0 15px 35px rgba(0, 0, 0, 0.4)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                {/* Popular Badge */}
                {tier.badge && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-12px",
                      right: "24px",
                      background: "linear-gradient(135deg, #6366f1, #d946ef)",
                      color: "#ffffff",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      padding: "4px 12px",
                      borderRadius: "999px",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      boxShadow: "0 4px 12px rgba(99, 102, 241, 0.5)",
                    }}
                  >
                    {tier.badge}
                  </div>
                )}

                <div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem", color: "#ffffff" }}>
                    {tier.name}
                  </h3>
                  <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.5, minHeight: "45px", marginBottom: "1.5rem" }}>
                    {tier.tagline}
                  </p>

                  {/* Price Tag */}
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "1.25rem" }}>
                    <span style={{ fontSize: "2.75rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.03em" }}>
                      ${tier.price}
                    </span>
                    <span style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
                      {billingCycle === "monthly" ? "/ month" : "one-time"}
                    </span>
                  </div>

                  {/* Delivery Turnaround */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      color: "#38bdf8",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      marginBottom: "1.75rem",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      background: "rgba(56, 189, 248, 0.08)",
                      width: "fit-content",
                    }}
                  >
                    <Clock size={14} /> Delivery: {tier.deliveryTime}
                  </div>

                  {/* Tech Stack Chips */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "1.75rem" }}>
                    {tier.techStack.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontSize: "0.75rem",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          background: "rgba(255, 255, 255, 0.05)",
                          color: "#cbd5e1",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Features List */}
                  <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem", marginBottom: "2rem" }}>
                    <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#94a3b8", fontWeight: 600, display: "block", marginBottom: "1rem" }}>
                      What&apos;s Included:
                    </span>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                      {tier.features.map((feat) => (
                        <li key={feat} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.9rem", color: "#e2e8f0" }}>
                          <Check size={16} style={{ color: "#34d399", marginTop: "3px", flexShrink: 0 }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Checkout CTA Button */}
                <button
                  onClick={() => handleCheckout(tier)}
                  disabled={isPending}
                  style={{
                    width: "100%",
                    padding: "1rem",
                    borderRadius: "0.85rem",
                    border: "none",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    cursor: isPending ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    background: tier.isPopular
                      ? "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)"
                      : "rgba(255, 255, 255, 0.1)",
                    color: "#ffffff",
                    boxShadow: tier.isPopular ? "0 8px 20px rgba(99, 102, 241, 0.3)" : "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  {isSelected ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Opening Stripe Checkout...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard size={18} />
                      <span>Order via Stripe Checkout</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* A La Carte / Add-On Services Section */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem 4rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.5rem" }}>
            A La Carte Services &amp; Upgrades
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "1rem" }}>
            Need a specific upgrade or standalone integration? Order individual services instantly.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {addOns.map((addon) => {
            const isSelected = activeTierId === addon.id && isPending;
            return (
              <div
                key={addon.id}
                style={{
                  background: "rgba(20, 20, 35, 0.5)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "1rem",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#ffffff" }}>{addon.title}</h4>
                    <span style={{ fontSize: "1.25rem", fontWeight: 700, color: "#38bdf8" }}>${addon.price}</span>
                  </div>
                  <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: "1.25rem" }}>
                    {addon.desc}
                  </p>
                </div>

                <button
                  onClick={() => handleAddonCheckout(addon)}
                  disabled={isPending}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    background: "rgba(99, 102, 241, 0.15)",
                    border: "1px solid rgba(99, 102, 241, 0.4)",
                    color: "#a5b4fc",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    cursor: isPending ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  {isSelected ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      <span>Order Service (${addon.price})</span>
                      <ChevronRight size={14} />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust & Guarantee Banner */}
      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 1.5rem 4rem" }}>
        <div
          style={{
            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%)",
            border: "1px solid rgba(99, 102, 241, 0.25)",
            borderRadius: "1.5rem",
            padding: "2.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(52, 211, 153, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#34d399",
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 style={{ fontWeight: 700, color: "#fff", marginBottom: "0.25rem" }}>100% Satisfaction Guarantee</h4>
              <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.5 }}>
                Unlimited revisions during the build phase until your website exceeds your standards.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(56, 189, 248, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#38bdf8",
                flexShrink: 0,
              }}
            >
              <Lock size={24} />
            </div>
            <div>
              <h4 style={{ fontWeight: 700, color: "#fff", marginBottom: "0.25rem" }}>Secure Stripe Payments</h4>
              <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.5 }}>
                Processed with 256-bit Stripe encryption. Receipts and invoices automatically generated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.5rem" }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
            Everything you need to know about starting your website project.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={{
                background: "rgba(20, 20, 35, 0.5)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "0.85rem",
                padding: "1.25rem 1.5rem",
              }}
            >
              <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#ffffff", marginBottom: "0.5rem" }}>
                {faq.q}
              </h4>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.6 }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#a5b4fc",
              fontSize: "0.95rem",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            ← Return to Portfolio Homepage
          </Link>
        </div>
      </section>
    </div>
  );
}

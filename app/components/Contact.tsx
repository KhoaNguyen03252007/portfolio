"use client";

import { useState, useTransition } from "react";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { sendContactMessageAction } from "@/app/actions/contact";

export default function Contact() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const res = await sendContactMessageAction(null, formData);
      if (res.success) {
        setStatus({
          text: res.isLiveDb
            ? "Your message has been stored in NeonDB! Khoa will reply promptly."
            : "Message received! (Running in demo fallback mode).",
          type: "success",
        });
        form.reset();
      } else {
        setStatus({
          text: res.error || "Failed to send message.",
          type: "error",
        });
      }
    });
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header">
          <div className="section-badge" id="contact-badge">
            <MessageCircle size={14} /> Direct Inquiries
          </div>
          <h2 className="section-title" id="contact-title">
            Let&apos;s Build Something <span>Exceptional</span>
          </h2>
          <p className="section-subtitle">
            Whether you have a project in mind, an architectural challenge, or a leadership role to discuss.
          </p>
        </div>

        <div className="contact-grid">
          {/* Direct Info Card */}
          <div className="glass-panel contact-info-card" id="contact-info-panel">
            <div>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.75rem" }}>
                Get In Touch
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                I am actively open to discussing high-impact engineering roles, technical advisory, and consulting engagements.
              </p>
            </div>

            <div className="contact-direct-list">
              <a href="mailto:khoa.nguyen.eng@example.com" className="contact-direct-item" id="contact-email-link">
                <div className="contact-icon-box">
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Email</div>
                  <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>khoa.nguyen.eng@example.com</div>
                </div>
              </a>

              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="contact-direct-item" id="contact-github-link">
                <div className="contact-icon-box">
                  <GithubIcon size={20} />
                </div>
                <div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>GitHub</div>
                  <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>github.com/khoanguyen</div>
                </div>
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-direct-item" id="contact-linkedin-link">
                <div className="contact-icon-box">
                  <LinkedinIcon size={20} />
                </div>
                <div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>LinkedIn</div>
                  <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>linkedin.com/in/khoanguyen-dev</div>
                </div>
              </a>

              <div className="contact-direct-item" id="contact-location-info">
                <div className="contact-icon-box">
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Location</div>
                  <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>San Francisco Bay Area / Remote Worldwide</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-panel" style={{ padding: "2.5rem" }} id="contact-form-panel">
            {status && (
              <div
                className={`alert ${status.type === "success" ? "alert-success" : "alert-error"}`}
                id="contact-status-alert"
              >
                {status.type === "success" ? (
                  <CheckCircle2 size={16} style={{ display: "inline", marginRight: "6px" }} />
                ) : (
                  <AlertCircle size={16} style={{ display: "inline", marginRight: "6px" }} />
                )}
                {status.text}
              </div>
            )}

            <form onSubmit={handleSubmit} id="contact-message-form">
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Your Full Name *</label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  required
                  placeholder="Jane Doe"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Your Email Address *</label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  required
                  placeholder="jane@company.com"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-subject">Subject</label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  placeholder="Project Inquiry / Engineering Opportunity"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Message *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about your project, timeline, or engineering goals..."
                  className="form-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="btn btn-primary"
                style={{ width: "100%", marginTop: "0.5rem" }}
                id="contact-submit-btn"
              >
                {isPending ? (
                  "Sending Message..."
                ) : (
                  <>
                    <Send size={16} /> Send Direct Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

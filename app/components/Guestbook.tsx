"use client";

import { useState, useTransition } from "react";
import { Database, Send, MessageSquare, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { GuestbookEntry } from "@/db/schema";
import { addGuestbookAction } from "@/app/actions/guestbook";

interface GuestbookProps {
  initialEntries: GuestbookEntry[];
}

const AVATAR_COLORS = ["#06b6d4", "#8b5cf6", "#10b981", "#f59e0b", "#ec4899", "#3b82f6"];

export default function Guestbook({ initialEntries }: GuestbookProps) {
  const [entries, setEntries] = useState<GuestbookEntry[]>(initialEntries);
  const [isPending, startTransition] = useTransition();
  const [selectedColor, setSelectedColor] = useState<string>(AVATAR_COLORS[0]);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("avatarColor", selectedColor);

    const name = formData.get("authorName") as string;
    const role = formData.get("role") as string;
    const message = formData.get("message") as string;

    // Optimistic UI update
    const optimisticEntry: GuestbookEntry = {
      id: Date.now(),
      authorName: name,
      role: role || null,
      message,
      avatarColor: selectedColor,
      createdAt: new Date(),
    };

    setEntries([optimisticEntry, ...entries]);

    startTransition(async () => {
      const response = await addGuestbookAction(null, formData);
      if (response.success) {
        setStatusMessage({
          text: response.isLiveDb
            ? "Entry successfully saved to NeonDB via Drizzle ORM!"
            : "Entry saved (Local fallback mode. Add DATABASE_URL to persist to live Neon).",
          type: "success",
        });
        form.reset();
      } else {
        setStatusMessage({
          text: response.error || "Failed to submit entry.",
          type: "error",
        });
        // Revert optimistic update
        setEntries(entries);
      }
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <section className="section" id="guestbook">
      <div className="container">
        <div className="section-header">
          <div className="section-badge" id="guestbook-badge">
            <Database size={14} /> NeonDB + Drizzle Powered
          </div>
          <h2 className="section-title" id="guestbook-title">
            Interactive <span>Guestbook</span>
          </h2>
          <p className="section-subtitle">
            Leave a note or endorsement! Every entry executes a type-safe Server Action using Drizzle ORM backed by Neon Serverless Postgres.
          </p>
        </div>

        <div className="guestbook-grid">
          {/* Sign Form */}
          <div className="glass-panel" style={{ padding: "2.25rem" }} id="guestbook-form-card">
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem", color: "#ffffff" }}>
              Sign the Guestbook
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              Connect with Khoa and leave your feedback or greeting.
            </p>

            {statusMessage && (
              <div
                className={`alert ${statusMessage.type === "success" ? "alert-success" : "alert-error"}`}
                id="guestbook-status-alert"
              >
                {statusMessage.type === "success" ? (
                  <CheckCircle2 size={16} style={{ display: "inline", marginRight: "6px" }} />
                ) : (
                  <AlertCircle size={16} style={{ display: "inline", marginRight: "6px" }} />
                )}
                {statusMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit} id="guestbook-form">
              <div className="form-group">
                <label className="form-label" htmlFor="gb-author-name">Your Name *</label>
                <input
                  type="text"
                  id="gb-author-name"
                  name="authorName"
                  required
                  placeholder="e.g. Alex Morgan"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="gb-role">Role / Company (Optional)</label>
                <input
                  type="text"
                  id="gb-role"
                  name="role"
                  placeholder="e.g. Staff Engineer @ TechCorp"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Avatar Badge Color</label>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem" }}>
                  {AVATAR_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        backgroundColor: color,
                        border: selectedColor === color ? "3px solid #ffffff" : "1px solid rgba(255,255,255,0.2)",
                        cursor: "pointer",
                        transform: selectedColor === color ? "scale(1.15)" : "scale(1)",
                        transition: "transform 0.15s ease",
                      }}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="gb-message">Your Message *</label>
                <textarea
                  id="gb-message"
                  name="message"
                  required
                  rows={3}
                  placeholder="Share a thought, endorsement, or say hello..."
                  className="form-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="btn btn-primary"
                style={{ width: "100%", marginTop: "0.5rem" }}
                id="guestbook-submit-btn"
              >
                {isPending ? (
                  "Submitting to NeonDB..."
                ) : (
                  <>
                    <Send size={16} /> Sign Guestbook
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Entries Feed */}
          <div className="glass-panel" style={{ padding: "2.25rem" }} id="guestbook-entries-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#ffffff", display: "flex", alignItems: "center", gap: "8px" }}>
                <MessageSquare size={18} style={{ color: "var(--cyan-primary)" }} />
                Recent Signatures ({entries.length})
              </h3>
              <span className="tag" style={{ fontSize: "0.72rem" }}>
                <Sparkles size={12} /> Live Sync
              </span>
            </div>

            <div className="guestbook-feed" id="guestbook-feed-list">
              {entries.map((entry) => (
                <div key={entry.id} className="glass-panel guestbook-card" id={`guestbook-entry-${entry.id}`}>
                  <div className="guestbook-meta">
                    <div
                      className="guestbook-avatar"
                      style={{ backgroundColor: entry.avatarColor || "#06b6d4" }}
                    >
                      {getInitials(entry.authorName)}
                    </div>
                    <div>
                      <div className="guestbook-user">{entry.authorName}</div>
                      {entry.role && <div className="guestbook-role">{entry.role}</div>}
                    </div>
                  </div>
                  <p className="guestbook-message">{entry.message}</p>
                  <div className="guestbook-time">
                    {new Date(entry.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

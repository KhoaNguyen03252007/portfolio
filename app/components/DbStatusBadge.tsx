"use client";

import { useState, useEffect } from "react";
import { Database, CheckCircle, AlertTriangle, ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { getDatabaseStatusAction } from "@/app/actions/dbStatus";

export default function DbStatusBadge() {
  const [status, setStatus] = useState<{
    connected: boolean;
    message: string;
    dialect: string;
  } | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getDatabaseStatusAction().then((res) => setStatus(res));
  }, []);

  const copyEnvHint = () => {
    navigator.clipboard.writeText('DATABASE_URL="postgresql://user:password@ep-xyz.aws.neon.tech/neondb?sslmode=require"');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!status) return null;

  return (
    <div className="container" style={{ marginTop: "1rem" }} id="db-status-container">
      <div className="db-status-bar" id="db-status-widget">
        <div className="db-status-info">
          <Database size={18} style={{ color: status.connected ? "var(--emerald-primary)" : "var(--amber-primary)" }} />
          <span>
            <strong>Database Status:</strong> {status.dialect}
          </span>
          <span className={`db-status-pill ${status.connected ? "db-status-live" : "db-status-demo"}`}>
            {status.connected ? "Live Connected" : "Local Demo Mode"}
          </span>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="btn btn-secondary btn-sm"
          id="db-status-toggle-details-btn"
          style={{ padding: "0.3rem 0.75rem", fontSize: "0.8rem" }}
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {expanded ? "Hide DB Info" : "Connection Details"}
        </button>
      </div>

      {expanded && (
        <div
          className="glass-panel"
          style={{
            padding: "1.5rem",
            marginBottom: "2rem",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            marginTop: "-2rem",
            fontSize: "0.9rem",
          }}
          id="db-status-details-panel"
        >
          <p style={{ color: "var(--text-secondary)", marginBottom: "0.75rem" }}>
            {status.message}
          </p>

          {!status.connected && (
            <div style={{ background: "rgba(0,0,0,0.4)", padding: "1rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ color: "var(--cyan-primary)", fontWeight: 600, fontSize: "0.82rem" }}>
                  To connect your real Neon Database, add this to <code style={{ color: "#ffffff" }}>.env.local</code>:
                </span>
                <button
                  onClick={copyEnvHint}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: "0.2rem 0.5rem", fontSize: "0.75rem" }}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <code style={{ color: "#38bdf8", fontFamily: "var(--font-mono)", fontSize: "0.82rem", wordBreak: "break-all" }}>
                DATABASE_URL=&quot;postgresql://[user]:[password]@[endpoint].aws.neon.tech/neondb?sslmode=require&quot;
              </code>
              <div style={{ marginTop: "0.75rem", color: "var(--text-muted)", fontSize: "0.8rem" }}>
                Then run <code style={{ color: "#34d399" }}>npx drizzle-kit push</code> to create tables, and <code style={{ color: "#34d399" }}>npm run db:seed</code> to populate with Khoa&apos;s data!
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

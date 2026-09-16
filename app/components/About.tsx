import { CheckCircle2, ShieldCheck, Zap, Server, Globe } from "lucide-react";

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-header">
          <div className="section-badge" id="about-badge">
            <ShieldCheck size={14} /> Engineering Philosophy
          </div>
          <h2 className="section-title" id="about-title">
            Passionate About <span>Performance</span> &amp; Architecture
          </h2>
          <p className="section-subtitle">
            A look into how I build software that scales reliably under enterprise demands.
          </p>
        </div>

        <div className="about-grid">
          {/* Left Narrative */}
          <div className="about-text" id="about-narrative">
            <p>
              I am <strong>Khoa Nguyen</strong>, a Senior Software Engineer with a relentless obsession for building
              high-throughput, delightful web applications and distributed backend architectures.
            </p>
            <p>
              Over the past 7+ years, I have architected and delivered enterprise-grade platforms across fintech,
              analytics, and SaaS. My modern weapon of choice is the combination of <strong>Next.js App Router</strong> with
              serverless database branching on <strong>NeonDB</strong> and compile-time type-safety with <strong>Drizzle ORM</strong>.
            </p>
            <p>
              I believe great software is born at the intersection of rigorous systems engineering and polished, intuitive user interfaces.
              Whether implementing sub-millisecond edge caches, optimizing PostgreSQL query execution plans, or designing fluid animations,
              I treat every detail with craftsmanship.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "var(--text-primary)", fontSize: "0.95rem" }}>
                <CheckCircle2 size={18} style={{ color: "var(--cyan-primary)" }} />
                <span>Zero-cold-start serverless architectures with NeonDB &amp; Edge compute</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "var(--text-primary)", fontSize: "0.95rem" }}>
                <CheckCircle2 size={18} style={{ color: "var(--cyan-primary)" }} />
                <span>End-to-end schema synchronization with Drizzle ORM and TypeScript</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "var(--text-primary)", fontSize: "0.95rem" }}>
                <CheckCircle2 size={18} style={{ color: "var(--cyan-primary)" }} />
                <span>Modern Vanilla CSS design systems with glassmorphic aesthetics</span>
              </div>
            </div>
          </div>

          {/* Right Metrics Grid */}
          <div className="about-metrics-grid" id="about-stats-grid">
            <div className="glass-panel metric-card" id="metric-experience">
              <div className="metric-number">7<span>+</span></div>
              <div className="metric-label">Years of Professional Experience</div>
            </div>

            <div className="glass-panel metric-card" id="metric-projects">
              <div className="metric-number">30<span>+</span></div>
              <div className="metric-label">Production Web &amp; Cloud Apps Shipped</div>
            </div>

            <div className="glass-panel metric-card" id="metric-uptime">
              <div className="metric-number">99.9<span>%</span></div>
              <div className="metric-label">Average System Reliability &amp; SLA</div>
            </div>

            <div className="glass-panel metric-card" id="metric-latency">
              <div className="metric-number">&lt;45<span>ms</span></div>
              <div className="metric-label">P99 Serverless Query Benchmarks</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowDown, Code2, Database, Sparkles, Terminal, Layers } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero section" id="hero">
      <div className="container">
        <div className="hero-grid">
          {/* Left Hero Content */}
          <div className="hero-content">
            <div className="hero-status-pill" id="hero-status-badge">
              <span className="status-dot"></span>
              <span>Available for Senior Engineering Roles</span>
            </div>

            <h1 className="hero-title" id="hero-main-title">
              Hi, I&apos;m Khoa Nguyen.<br />
              Building Modern Web &amp; Cloud Systems.
            </h1>

            <p className="hero-lead" id="hero-intro-text">
              Senior Full-Stack Software Engineer specializing in <strong>Next.js App Router</strong>,{" "}
              <strong>NeonDB Serverless Postgres</strong>, and <strong>Drizzle ORM</strong>. I craft
              blazing-fast, resilient applications designed for massive scale and delightful user experiences.
            </p>

            <div className="hero-cta" id="hero-cta-buttons">
              <Link href="/shop" className="btn btn-primary" id="hero-btn-services" style={{ background: "linear-gradient(135deg, #6366f1, #d946ef)", border: "none" }}>
                <Sparkles size={18} /> Order Website Services
              </Link>
              <Link href="#projects" className="btn btn-secondary" id="hero-btn-projects">
                <Layers size={18} /> Featured Work
              </Link>
              <Link href="#contact" className="btn btn-secondary" id="hero-btn-contact">
                Contact Me
              </Link>
            </div>

            <div className="hero-tech-stack" id="hero-tech-bar">
              <span className="hero-tech-label">Core Stack:</span>
              <div className="hero-tech-badges">
                <span className="tag">Next.js 15</span>
                <span className="tag">TypeScript</span>
                <span className="tag">NeonDB</span>
                <span className="tag">Drizzle ORM</span>
                <span className="tag">PostgreSQL</span>
                <span className="tag">React 19</span>
              </div>
            </div>
          </div>

          {/* Right Hero Code Terminal Showcase */}
          <div className="terminal-card" id="hero-code-terminal">
            <div className="terminal-header">
              <div className="terminal-dots">
                <div className="dot dot-red"></div>
                <div className="dot dot-yellow"></div>
                <div className="dot dot-green"></div>
              </div>
              <div className="terminal-title">
                <Terminal size={14} style={{ display: "inline", marginRight: "6px" }} />
                khoa.config.ts — NeonDB + Drizzle
              </div>
              <Sparkles size={14} style={{ color: "var(--cyan-primary)" }} />
            </div>

            <div className="terminal-body">
              <p><span className="code-comment">// Architecting type-safe serverless applications</span></p>
              <p>
                <span className="code-keyword">import</span> &#123; neon &#125; <span className="code-keyword">from</span> <span className="code-string">&quot;@neondatabase/serverless&quot;</span>;
              </p>
              <p>
                <span className="code-keyword">import</span> &#123; drizzle &#125; <span className="code-keyword">from</span> <span className="code-string">&quot;drizzle-orm/neon-http&quot;</span>;
              </p>
              <br />
              <p>
                <span className="code-keyword">export const</span> <span className="code-variable">engineer</span> = &#123;
              </p>
              <p style={{ paddingLeft: "1.2rem" }}>
                name: <span className="code-string">&quot;Khoa Nguyen&quot;</span>,
              </p>
              <p style={{ paddingLeft: "1.2rem" }}>
                role: <span className="code-string">&quot;Senior Full-Stack &amp; Cloud Engineer&quot;</span>,
              </p>
              <p style={{ paddingLeft: "1.2rem" }}>
                focus: [<span className="code-string">&quot;Scalability&quot;</span>, <span className="code-string">&quot;Type Safety&quot;</span>, <span className="code-string">&quot;Edge Architecture&quot;</span>],
              </p>
              <p style={{ paddingLeft: "1.2rem" }}>
                dbDriver: <span className="code-func">neon</span>(process.env.<span className="code-variable">DATABASE_URL</span>),
              </p>
              <p style={{ paddingLeft: "1.2rem" }}>
                orm: <span className="code-string">&quot;Drizzle ORM v0.40+&quot;</span>,
              </p>
              <p style={{ paddingLeft: "1.2rem" }}>
                uptime: <span className="code-string">&quot;99.99%&quot;</span>,
              </p>
              <p>&#125;;</p>
              <br />
              <p><span className="code-comment">// Query execution sub-millisecond</span></p>
              <p>
                <span className="code-keyword">const</span> <span className="code-variable">stack</span> = <span className="code-keyword">await</span> db.<span className="code-func">select</span>().<span className="code-func">from</span>(projects);
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

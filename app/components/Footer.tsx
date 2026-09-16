import Link from "next/link";
import { Mail, ArrowUp, Database, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="footer" id="main-footer">
      <div className="container">
        <div className="footer-content">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <span style={{ fontWeight: 800, fontSize: "1.1rem", fontFamily: "var(--font-display)", color: "#ffffff" }}>
                Khoa Nguyen
              </span>
              <span className="tag" style={{ fontSize: "0.72rem" }}>
                <Database size={11} /> Neon + Drizzle
              </span>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", maxWidth: "420px" }}>
              Senior Full-Stack &amp; Distributed Systems Engineer. Dedicated to performance, resilience, and elegant developer experience.
            </p>
          </div>

          <div className="footer-socials">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="GitHub"
              id="footer-github"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="LinkedIn"
              id="footer-linkedin"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href="mailto:khoa.nguyen.eng@example.com"
              className="social-icon-btn"
              aria-label="Email"
              id="footer-email"
            >
              <Mail size={18} />
            </a>
            <Link
              href="#hero"
              className="social-icon-btn"
              aria-label="Back to Top"
              id="footer-back-to-top"
              title="Back to Top"
            >
              <ArrowUp size={18} />
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Khoa Nguyen. Built with Next.js 15, NeonDB Serverless PostgreSQL, Drizzle ORM &amp; Vanilla CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, Database } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="navbar" id="main-header">
      <nav className={`nav-wrapper ${scrolled ? "scrolled" : ""}`} aria-label="Main Navigation">
        <Link href="#hero" className="nav-logo" id="nav-brand-logo">
          <div className="nav-logo-badge">KN</div>
          <span>Khoa Nguyen</span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="nav-links" id="desktop-nav-menu">
          <li><Link href="#about" className="nav-link" id="nav-link-about">About</Link></li>
          <li><Link href="#skills" className="nav-link" id="nav-link-skills">Skills</Link></li>
          <li><Link href="#projects" className="nav-link" id="nav-link-projects">Projects</Link></li>
          <li><Link href="#experience" className="nav-link" id="nav-link-experience">Experience</Link></li>
          <li>
            <Link href="#guestbook" className="nav-link" id="nav-link-guestbook" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Database size={13} style={{ color: "var(--cyan-primary)" }} /> Guestbook
            </Link>
          </li>
          <li><Link href="#contact" className="nav-link" id="nav-link-contact">Contact</Link></li>
        </ul>

        <div className="nav-actions">
          <Link href="#contact" className="btn btn-primary btn-sm" id="nav-cta-contact">
            Let&apos;s Talk <ArrowUpRight size={15} />
          </Link>

          <button
            className="menu-toggle"
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className="glass-panel"
          id="mobile-dropdown-menu"
          style={{
            marginTop: "0.5rem",
            padding: "1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Link
            href="#about"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
            id="m-nav-link-about"
          >
            About
          </Link>
          <Link
            href="#skills"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
            id="m-nav-link-skills"
          >
            Skills
          </Link>
          <Link
            href="#projects"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
            id="m-nav-link-projects"
          >
            Projects
          </Link>
          <Link
            href="#experience"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
            id="m-nav-link-experience"
          >
            Experience
          </Link>
          <Link
            href="#guestbook"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
            id="m-nav-link-guestbook"
          >
            Guestbook (NeonDB)
          </Link>
          <Link
            href="#contact"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
            id="m-nav-link-contact"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}

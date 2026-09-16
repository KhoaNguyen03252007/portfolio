import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Khoa Nguyen | Senior Full-Stack Engineer | Next.js, NeonDB & Drizzle ORM",
  description: "Senior Full-Stack & Distributed Systems Engineer specializing in Next.js App Router, NeonDB Serverless Postgres, and Drizzle ORM. Discover projects, technical skills, and leave a signature in the live guestbook.",
  keywords: [
    "Khoa Nguyen",
    "Full-Stack Engineer",
    "Next.js",
    "NeonDB",
    "Drizzle ORM",
    "TypeScript",
    "PostgreSQL",
    "Cloud Architecture",
    "Portfolio"
  ],
  authors: [{ name: "Khoa Nguyen" }],
  openGraph: {
    title: "Khoa Nguyen | Senior Full-Stack Engineer",
    description: "Senior Full-Stack Engineer specializing in Next.js, NeonDB Serverless Postgres, and Drizzle ORM.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="bg-ambient-grid" aria-hidden="true" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

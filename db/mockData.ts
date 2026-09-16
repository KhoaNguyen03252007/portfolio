import { Project, Skill, Experience, GuestbookEntry } from "./schema";

export const initialProjects: Omit<Project, "id" | "createdAt">[] = [
  {
    title: "NovaCloud Distributed Cache & Edge Orchestrator",
    slug: "novacloud-edge-orchestrator",
    summary: "Sub-millisecond distributed state coordination platform deployed across multi-region serverless clusters.",
    description: "Architected and built a high-throughput edge orchestration layer with Next.js 15, Neon Postgres serverless branching, and Redis caching. Handles 50,000+ operations/sec with automated failover and zero cold-start replication.",
    category: "cloud-systems",
    tags: ["Next.js", "NeonDB", "Drizzle ORM", "TypeScript", "PostgreSQL", "Redis", "Docker"],
    demoUrl: "https://demo.example.com/novacloud",
    githubUrl: "https://github.com/khoanguyen/novacloud",
    stats: "50k req/s • 0.8ms latency",
    featured: true,
    sortOrder: 1,
  },
  {
    title: "Synthetix AI Real-Time Analytics Pipeline",
    slug: "synthetix-ai-pipeline",
    summary: "Real-time streaming LLM telemetry and vector similarity search engine with sub-second insights.",
    description: "End-to-end vector retrieval and analytics engine leveraging pgvector on Neon Serverless, Drizzle schema migrations, and Next.js Server Actions. Processed over 12M embedding queries with semantic clustering.",
    category: "ai-data",
    tags: ["NeonDB", "pgvector", "Drizzle ORM", "Next.js", "Python", "FastAPI", "Tailwind/CSS"],
    demoUrl: "https://demo.example.com/synthetix",
    githubUrl: "https://github.com/khoanguyen/synthetix-ai",
    stats: "12M+ queries • 99.98% SLA",
    featured: true,
    sortOrder: 2,
  },
  {
    title: "PulseDesk Omnichannel Support Platform",
    slug: "pulsedesk-support",
    summary: "Enterprise real-time collaborative workspace with optimistic UI, live cursor sync, and CRM connectors.",
    description: "Engineered a collaborative helpdesk platform utilizing Next.js App Router, server-sent events, and NeonDB transactional guarantees with Drizzle ORM. Reduced agent response time by 42%.",
    category: "fullstack",
    tags: ["Next.js 15", "TypeScript", "Drizzle ORM", "NeonDB", "WebSockets", "CSS Modules"],
    demoUrl: "https://demo.example.com/pulsedesk",
    githubUrl: "https://github.com/khoanguyen/pulsedesk",
    stats: "35k active users • 42% faster resolution",
    featured: true,
    sortOrder: 3,
  },
  {
    title: "AuraPay Global Payments Gateway & Reconciliation",
    slug: "aurapay-gateway",
    summary: "PCI-DSS compliant multi-currency ledger system with automated reconciliation and audit trail.",
    description: "Designed resilient financial ledger using Neon PostgreSQL branching for automated migration testing and Drizzle ORM schema type safety. Zero reconciliation discrepancies over $8M+ processed volume.",
    category: "cloud-systems",
    tags: ["TypeScript", "Next.js", "NeonDB", "Drizzle ORM", "Stripe API", "PostgreSQL"],
    demoUrl: "https://demo.example.com/aurapay",
    githubUrl: "https://github.com/khoanguyen/aurapay",
    stats: "$8M+ processed • 100% audit pass",
    featured: false,
    sortOrder: 4,
  },
  {
    title: "DevSprint Agile Planning & Velocity Suite",
    slug: "devsprint-suite",
    summary: "Fast, keyboard-driven sprint planning and issue tracker designed for high-velocity engineering squads.",
    description: "Built a lightning-fast issue tracking tool featuring instant optimistic updates, offline caching, and instant NeonDB serverless sync via Drizzle ORM. Keyboard-first UX with sub-30ms interaction latencies.",
    category: "fullstack",
    tags: ["Next.js", "React 19", "Drizzle ORM", "NeonDB", "TypeScript", "Vanilla CSS"],
    demoUrl: "https://demo.example.com/devsprint",
    githubUrl: "https://github.com/khoanguyen/devsprint",
    stats: "Sub-30ms interactions • 4.9/5 satisfaction",
    featured: false,
    sortOrder: 5,
  },
];

export const initialSkills: Omit<Skill, "id">[] = [
  // Languages & Core
  { category: "Languages", name: "TypeScript / JavaScript", proficiency: 98, highlight: "Advanced type systems, generics, ASTs", sortOrder: 1 },
  { category: "Languages", name: "SQL (PostgreSQL / Neon)", proficiency: 95, highlight: "Complex indexing, query planning, CTEs", sortOrder: 2 },
  { category: "Languages", name: "Python", proficiency: 88, highlight: "FastAPI, data pipelines, PyTorch / LangChain", sortOrder: 3 },
  { category: "Languages", name: "Go", proficiency: 82, highlight: "Concurrent microservices, gRPC, CLI tools", sortOrder: 4 },

  // Frameworks & Frontend
  { category: "Frameworks & Frontend", name: "Next.js (App Router / SSR)", proficiency: 96, highlight: "Server Actions, RSC, Streaming, PPR", sortOrder: 5 },
  { category: "Frameworks & Frontend", name: "React 19 / Modern Hooks", proficiency: 96, highlight: "Concurrent mode, optimistic UI, Suspense", sortOrder: 6 },
  { category: "Frameworks & Frontend", name: "Modern CSS & Responsive Design", proficiency: 92, highlight: "Glassmorphism, animations, design systems", sortOrder: 7 },

  // Databases & ORM
  { category: "Databases & ORM", name: "NeonDB Serverless Postgres", proficiency: 95, highlight: "Branching workflows, connection pooling, pgvector", sortOrder: 8 },
  { category: "Databases & ORM", name: "Drizzle ORM", proficiency: 96, highlight: "Zero-overhead schema modeling, relations, drizzle-kit", sortOrder: 9 },
  { category: "Databases & ORM", name: "Redis / Key-Value Stores", proficiency: 88, highlight: "Rate limiting, pub/sub, distributed caching", sortOrder: 10 },

  // Cloud & DevOps
  { category: "Cloud & DevOps", name: "Docker & Containerization", proficiency: 90, highlight: "Multi-stage builds, rootless containers", sortOrder: 11 },
  { category: "Cloud & DevOps", name: "AWS & Vercel Cloud", proficiency: 90, highlight: "Edge functions, S3, IAM, CloudFront, Lambda", sortOrder: 12 },
  { category: "Cloud & DevOps", name: "CI/CD & GitHub Actions", proficiency: 88, highlight: "Automated test suites, preview environments", sortOrder: 13 },
];

export const initialExperiences: Omit<Experience, "id">[] = [
  {
    role: "Lead Full-Stack & Cloud Engineer",
    company: "Apex Scale Technologies",
    period: "2023 — Present",
    description: "Heading architectural evolution of cloud-native enterprise platforms, spearheading Next.js App Router adoption, database modernization to NeonDB with Drizzle ORM, and high-throughput streaming services.",
    highlights: [
      "Cut database infrastructure costs by 45% while decreasing P99 latency from 180ms to 24ms using NeonDB serverless autoscaling.",
      "Architected Next.js micro-frontends and robust Drizzle ORM migration pipelines powering over 500,000 monthly active users.",
      "Mentored a high-performing engineering group of 12 full-stack and backend developers.",
    ],
    sortOrder: 1,
  },
  {
    role: "Senior Software Engineer",
    company: "Vanguard Digital Labs",
    period: "2021 — 2023",
    description: "Engineered scalable real-time collaboration engines and distributed financial microservices using TypeScript, PostgreSQL, and Node.js.",
    highlights: [
      "Spearheaded the migration of monolithic data queries into type-safe ORM queries with zero production downtime.",
      "Engineered real-time optimistic state sync handling 25,000 concurrent WebSocket sessions.",
      "Awarded Engineer of the Year for delivering the flagship enterprise dashboard ahead of schedule.",
    ],
    sortOrder: 2,
  },
  {
    role: "Full-Stack Software Developer",
    company: "Nexus Interactive Systems",
    period: "2019 — 2021",
    description: "Built responsive client portals, robust REST & GraphQL APIs, and automated data synchronization microservices.",
    highlights: [
      "Designed and shipped 14+ client web applications with 100% on-time delivery.",
      "Implemented automated CI/CD deployment workflows and end-to-end integration test suites.",
      "Boosted web application Core Web Vitals to consistent 95+ scores.",
    ],
    sortOrder: 3,
  },
];

export const initialGuestbookEntries: GuestbookEntry[] = [
  {
    id: 1,
    authorName: "Sarah Jenkins",
    role: "VP of Engineering at CloudScale",
    message: "Khoa is one of the sharpest engineers I have worked with. His mastery of modern Next.js and distributed database architectures transformed our infrastructure.",
    avatarColor: "#06b6d4",
    createdAt: new Date("2026-03-01T10:00:00Z"),
  },
  {
    id: 2,
    authorName: "Marcus Vance",
    role: "Principal Architect at Apex Systems",
    message: "The way Khoa integrates NeonDB and Drizzle ORM into clean, type-safe Next.js code is a textbook example of modern web development excellence.",
    avatarColor: "#8b5cf6",
    createdAt: new Date("2026-03-05T14:30:00Z"),
  },
  {
    id: 3,
    authorName: "Elena Rostova",
    role: "Senior Product Manager",
    message: "Incredible attention to UI details, animation polish, and backend resilience. Khoa always exceeds expectations!",
    avatarColor: "#10b981",
    createdAt: new Date("2026-03-09T08:15:00Z"),
  },
];

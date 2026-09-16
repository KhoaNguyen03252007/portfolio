CREATE TABLE "experiences" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" varchar(255) NOT NULL,
	"company" varchar(255) NOT NULL,
	"period" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"highlights" jsonb NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "guestbook" (
	"id" serial PRIMARY KEY NOT NULL,
	"author_name" varchar(100) NOT NULL,
	"role" varchar(150),
	"message" text NOT NULL,
	"avatar_color" varchar(50) DEFAULT '#06b6d4',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"subject" varchar(255),
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"summary" text NOT NULL,
	"description" text NOT NULL,
	"category" varchar(100) NOT NULL,
	"tags" jsonb NOT NULL,
	"demo_url" varchar(500),
	"github_url" varchar(500),
	"stats" varchar(255),
	"featured" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"category" varchar(100) NOT NULL,
	"name" varchar(100) NOT NULL,
	"proficiency" integer NOT NULL,
	"highlight" text,
	"sort_order" integer DEFAULT 0 NOT NULL
);

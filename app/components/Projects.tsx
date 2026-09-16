"use client";

import { useState } from "react";
import { Layers, ExternalLink, Sparkles } from "lucide-react";
import { GithubIcon } from "./Icons";
import { Project } from "@/db/schema";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filterOptions = [
    { label: "All Projects", value: "all" },
    { label: "Full Stack & Next.js", value: "fullstack" },
    { label: "Cloud & Systems", value: "cloud-systems" },
    { label: "AI & Data Pipelines", value: "ai-data" },
  ];

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-header">
          <div className="section-badge" id="projects-badge">
            <Layers size={14} /> Production Portfolio
          </div>
          <h2 className="section-title" id="projects-title">
            Featured <span>Work &amp; Systems</span>
          </h2>
          <p className="section-subtitle">
            Engineered with modern full-stack architectures, resilient NeonDB data models, and Drizzle ORM queries.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="projects-filter-bar" id="projects-filter-bar">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              className={`filter-btn ${activeFilter === opt.value ? "active" : ""}`}
              onClick={() => setActiveFilter(opt.value)}
              id={`filter-btn-${opt.value}`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid" id="projects-list-grid">
          {filteredProjects.map((project) => (
            <article key={project.id} className="glass-panel project-card" id={`project-card-${project.slug}`}>
              <div>
                <div className="project-card-header">
                  <h3 className="project-title">{project.title}</h3>
                  {project.stats && (
                    <span className="project-stats-pill">{project.stats}</span>
                  )}
                </div>

                <p className="project-summary" style={{ marginTop: "1rem" }}>
                  {project.description}
                </p>
              </div>

              <div>
                <div className="project-tags" style={{ marginBottom: "1rem" }}>
                  {Array.isArray(project.tags) &&
                    project.tags.map((tag, idx) => (
                      <span key={idx} className="tag">
                        {tag}
                      </span>
                    ))}
                </div>

                <div className="project-actions">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      id={`project-demo-${project.id}`}
                    >
                      <ExternalLink size={15} /> Live Demo
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      id={`project-github-${project.id}`}
                    >
                      <GithubIcon size={15} /> Source Code
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

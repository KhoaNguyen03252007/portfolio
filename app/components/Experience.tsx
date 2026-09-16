import { Briefcase, Calendar, CheckCircle } from "lucide-react";
import { Experience } from "@/db/schema";

interface ExperienceProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceProps) {
  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="section-header">
          <div className="section-badge" id="experience-badge">
            <Briefcase size={14} /> Career Journey
          </div>
          <h2 className="section-title" id="experience-title">
            Work <span>Experience</span>
          </h2>
          <p className="section-subtitle">
            A track record of technical leadership, shipping enterprise products, and scaling distributed infrastructure.
          </p>
        </div>

        <div className="timeline" id="experience-timeline">
          {experiences.map((exp) => (
            <div key={exp.id} className="timeline-item" id={`timeline-item-${exp.id}`}>
              <div className="timeline-marker">
                <Briefcase size={18} />
              </div>

              <div className="glass-panel timeline-content">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-role">{exp.role}</h3>
                    <span className="timeline-company">{exp.company}</span>
                  </div>
                  <span className="timeline-period">
                    <Calendar size={13} style={{ display: "inline", marginRight: "4px" }} />
                    {exp.period}
                  </span>
                </div>

                <p className="timeline-desc">{exp.description}</p>

                {Array.isArray(exp.highlights) && exp.highlights.length > 0 && (
                  <ul className="timeline-bullets">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

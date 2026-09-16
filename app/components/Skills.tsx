import { Cpu, Database, Code2, Cloud, Terminal } from "lucide-react";
import { Skill } from "@/db/schema";

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  // Group skills by category
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Languages":
        return <Code2 size={20} />;
      case "Frameworks & Frontend":
        return <Cpu size={20} />;
      case "Databases & ORM":
        return <Database size={20} />;
      case "Cloud & DevOps":
        return <Cloud size={20} />;
      default:
        return <Terminal size={20} />;
    }
  };

  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="section-header">
          <div className="section-badge" id="skills-badge">
            <Cpu size={14} /> Technical Arsenal
          </div>
          <h2 className="section-title" id="skills-title">
            Skills &amp; <span>Expertise</span>
          </h2>
          <p className="section-subtitle">
            Engineered with deep specialization in modern web frameworks, serverless databases, and scalable cloud systems.
          </p>
        </div>

        <div className="skills-category-grid" id="skills-grid">
          {categories.map((category) => {
            const categorySkills = skills.filter((s) => s.category === category);
            return (
              <div key={category} className="glass-panel skill-card">
                <div className="skill-category-title">
                  {getCategoryIcon(category)}
                  <span>{category}</span>
                </div>

                <div className="skill-list">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="skill-item">
                      <div className="skill-header">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-pct">{skill.proficiency}%</span>
                      </div>
                      <div className="skill-bar-bg">
                        <div
                          className="skill-bar-fill"
                          style={{ width: `${skill.proficiency}%` }}
                        ></div>
                      </div>
                      {skill.highlight && (
                        <span className="skill-highlight">{skill.highlight}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

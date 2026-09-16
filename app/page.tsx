import { getProjects, getSkills, getExperiences, getGuestbookEntries } from "@/db";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ExperienceSection from "./components/Experience";
import Guestbook from "./components/Guestbook";
import Contact from "./components/Contact";
import DbStatusBadge from "./components/DbStatusBadge";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [projects, skills, experiences, guestbookEntries] = await Promise.all([
    getProjects(),
    getSkills(),
    getExperiences(),
    getGuestbookEntries(),
  ]);

  return (
    <>
      <DbStatusBadge />
      <Hero />
      <About />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <ExperienceSection experiences={experiences} />
      <Guestbook initialEntries={guestbookEntries} />
      <Contact />
    </>
  );
}

import { getProjects, getSkills, getExperiences, getGuestbookEntries } from "@/db";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ExperienceSection from "./components/Experience";
import Guestbook from "./components/Guestbook";
import StripeCheckoutSection from "./components/StripeCheckoutSection";
import Contact from "./components/Contact";
import DbStatusBadge from "./components/DbStatusBadge";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  try {
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
        <StripeCheckoutSection />
        <Contact />
      </>
    );
  } catch (error: any) {
    return (
      <div style={{ padding: '50px', background: 'black', color: 'red', minHeight: '100vh', zIndex: 9999, position: 'relative' }}>
        <h1>Runtime Error in Vercel</h1>
        <pre>{error.message}</pre>
        <pre>{error.stack}</pre>
      </div>
    );
  }
}


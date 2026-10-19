import { HeroSection } from "../sections/HeroSection";
import { AboutSection } from "../sections/AboutSection";
import { SkillsSection } from "../sections/SkillsSection";
import { ProjectsSection } from "../sections/ProjectsSection";
import { JourneySections } from "../sections/JourneySections";
import { CertificationsSection } from "../sections/CertificationsSection";
import { ContactSection } from "../sections/ContactSection";
import { profile } from "../content/profile";
import { usePageMetadata } from "../hooks/usePageMetadata";

export default function HomePage() {
  usePageMetadata(
    `${profile.name} — Developer & Cybersecurity Enthusiast`,
    profile.introduction,
  );
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <JourneySections />
      <CertificationsSection />
      <ContactSection />
    </>
  );
}

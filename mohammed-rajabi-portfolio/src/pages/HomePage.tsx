import { HeroSection } from "../sections/HeroSection";
import { AboutSection } from "../sections/AboutSection";
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
      {/* Integrate later sections here in homepageSections order, gated by real content. */}
    </>
  );
}

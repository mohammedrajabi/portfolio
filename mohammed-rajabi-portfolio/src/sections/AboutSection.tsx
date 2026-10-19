import { Sparkles } from "lucide-react";
import { SectionContainer } from "../components/ui/SectionContainer";
import { DeveloperIllustration } from "../components/about/DeveloperIllustration";
import { profile } from "../content/profile";
import { homeContent } from "../content/home";

export function AboutSection() {
  return (
    <div className="about-band">
      <SectionContainer
        id="about"
        tabIndex={-1}
        className="about-section"
        aria-labelledby="about-heading"
      >
        <div className="about-art">
          <DeveloperIllustration />
          <span className="about-sticker" aria-hidden="true">
            IDEAS WELCOME <Sparkles size={17} />
          </span>
        </div>
        <div className="about-copy">
          <p className="eyebrow">
            <span />
            {homeContent.aboutLabel}
          </p>
          <h2 id="about-heading">{homeContent.aboutHeading}</h2>
          <p className="about-biography">{profile.about}</p>
          <ul className="about-values" aria-label="What drives me">
            {homeContent.values.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
          <p className="about-note">
            <Sparkles size={18} aria-hidden="true" />
            {homeContent.aboutNote}
          </p>
        </div>
      </SectionContainer>
    </div>
  );
}

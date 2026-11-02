import { SectionContainer } from "../components/ui/SectionContainer";
import { QuickFacts } from "../components/about/QuickFacts";
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
        <div className="about-copy">
          <p className="eyebrow">
            <span />
            {homeContent.aboutLabel}
          </p>
          <h2 id="about-heading">{homeContent.aboutHeading}</h2>
          <p className="about-biography">{profile.about}</p>
        </div>
        <QuickFacts />
      </SectionContainer>
    </div>
  );
}

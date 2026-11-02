import { SectionContainer } from "../components/ui/SectionContainer";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ContentGate } from "../components/ui/ContentGate";
import { SkillsTabs } from "../components/skills/SkillsTabs";
import { skills } from "../content/skills";
import { sectionContent } from "../content/sections";

export function SkillsSection() {
  return (
    <ContentGate items={skills}>
      <SectionContainer
        id="skills"
        tabIndex={-1}
        aria-labelledby="skills-heading"
        className="portfolio-section skills-section"
      >
        <SectionHeading
          id="skills-heading"
          number="02"
          {...sectionContent.skills}
        />
        <SkillsTabs />
      </SectionContainer>
    </ContentGate>
  );
}

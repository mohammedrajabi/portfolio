import { SectionContainer } from "../components/ui/SectionContainer";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ContentGate } from "../components/ui/ContentGate";
import { CardEntrance } from "../components/ui/CardEntrance";
import { SkillCategoryCard } from "../components/skills/SkillCategoryCard";
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
        <div className="skills-grid">
          {skills.map((category, index) => (
            <CardEntrance
              key={category.id}
              index={index}
              className={`skill-grid-${category.id}`}
            >
              <SkillCategoryCard category={category} index={index} />
            </CardEntrance>
          ))}
        </div>
      </SectionContainer>
    </ContentGate>
  );
}

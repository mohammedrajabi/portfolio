import { SectionContainer } from "../components/ui/SectionContainer";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ContentGate } from "../components/ui/ContentGate";
import { ExperienceCard } from "../components/journey/ExperienceCard";
import { experience } from "../content/experience";
import { sectionContent } from "../content/sections";

export function ExperienceSection() {
  return (
    <ContentGate items={experience}>
      <SectionContainer
        id="experience"
        tabIndex={-1}
        aria-labelledby="experience-heading"
        className="portfolio-section experience-section"
      >
        <SectionHeading
          id="experience-heading"
          number="↗"
          {...sectionContent.experience}
        />
        <div className="experience-records">
          {experience.map((record) => (
            <ExperienceCard key={record.id} record={record} />
          ))}
        </div>
      </SectionContainer>
    </ContentGate>
  );
}

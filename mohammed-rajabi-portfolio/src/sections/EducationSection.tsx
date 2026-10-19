import { SectionContainer } from "../components/ui/SectionContainer";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ContentGate } from "../components/ui/ContentGate";
import { CardEntrance } from "../components/ui/CardEntrance";
import { EducationCard } from "../components/journey/EducationCard";
import { education } from "../content/education";
import { sectionContent } from "../content/sections";

export function EducationSection() {
  return (
    <ContentGate items={education}>
      <SectionContainer
        id="education"
        tabIndex={-1}
        aria-labelledby="education-heading"
        className="portfolio-section education-section"
      >
        <SectionHeading
          id="education-heading"
          number="04"
          {...sectionContent.education}
        />
        <div className="education-grid">
          {education.map((record, index) => (
            <CardEntrance key={record.id} index={index}>
              <EducationCard record={record} index={index} />
            </CardEntrance>
          ))}
        </div>
      </SectionContainer>
    </ContentGate>
  );
}

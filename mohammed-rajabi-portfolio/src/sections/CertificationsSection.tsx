import { SectionContainer } from "../components/ui/SectionContainer";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ContentGate } from "../components/ui/ContentGate";
import { CertificationCard } from "../components/certifications/CertificationCard";
import { certifications } from "../content/certifications";
import { sectionContent } from "../content/sections";

export function CertificationsSection() {
  return (
    <ContentGate items={certifications}>
      <SectionContainer
        id="certifications"
        tabIndex={-1}
        aria-labelledby="certifications-heading"
        className="portfolio-section"
      >
        <SectionHeading
          id="certifications-heading"
          number="↗"
          {...sectionContent.certifications}
        />
        <div className="certificate-grid">
          {certifications.map((record) => (
            <CertificationCard key={record.id} record={record} />
          ))}
        </div>
      </SectionContainer>
    </ContentGate>
  );
}

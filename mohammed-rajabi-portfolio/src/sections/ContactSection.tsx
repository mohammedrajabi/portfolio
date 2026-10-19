import { SectionContainer } from "../components/ui/SectionContainer";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ContentGate } from "../components/ui/ContentGate";
import { CardEntrance } from "../components/ui/CardEntrance";
import { ContactCard } from "../components/contact/ContactCard";
import { contacts } from "../content/contact";
import { sectionContent } from "../content/sections";

export function ContactSection() {
  return (
    <ContentGate items={contacts}>
      <div className="contact-band">
        <SectionContainer
          id="contact"
          tabIndex={-1}
          className="portfolio-section contact-section"
          aria-labelledby="contact-heading"
        >
          <SectionHeading
            id="contact-heading"
            number="05"
            {...sectionContent.contact}
          />
          <div className="contact-grid">
            {contacts.map((contact, index) => (
              <CardEntrance key={contact.kind} index={index}>
                <ContactCard contact={contact} />
              </CardEntrance>
            ))}
          </div>
        </SectionContainer>
      </div>
    </ContentGate>
  );
}

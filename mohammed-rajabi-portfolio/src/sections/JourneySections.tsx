import { EducationSection } from "./EducationSection";
import { ExperienceSection } from "./ExperienceSection";
import { experience } from "../content/experience";
import { education } from "../content/education";
import { hasContent } from "../utils/content";

export function JourneySections() {
  return (
    <div
      className={`journey-layout ${hasContent(experience) && hasContent(education) ? "journey-paired" : ""}`}
    >
      <ExperienceSection />
      <EducationSection />
    </div>
  );
}

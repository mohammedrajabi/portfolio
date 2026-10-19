import type { DeveloperCardContent, HomepageSection } from "../types/content";
import { projects } from "./projects";
import { experience } from "./experience";
import { certifications } from "./certifications";
import { education } from "./education";
import { skills } from "./skills";
import { contacts } from "./contact";
import { hasContent } from "../utils/content";

// Enable a section only after its component is integrated into HomePage.
export const homepageSections: HomepageSection[] = [
  {
    id: "home",
    label: "Home",
    implemented: true,
    hasContent: true,
    accent: "yellow",
  },
  {
    id: "about",
    label: "About",
    implemented: true,
    hasContent: true,
    accent: "blue",
  },
  {
    id: "skills",
    label: "Skills",
    implemented: true,
    hasContent: hasContent(skills),
    accent: "coral",
  },
  {
    id: "projects",
    label: "Projects",
    implemented: true,
    hasContent: hasContent(projects),
    showWhenEmpty: true,
    accent: "yellow",
  },
  {
    id: "experience",
    label: "Experience",
    implemented: true,
    hasContent: hasContent(experience),
    accent: "blue",
  },
  {
    id: "education",
    label: "Education",
    implemented: true,
    hasContent: hasContent(education),
    accent: "coral",
  },
  {
    id: "certifications",
    label: "Certifications",
    implemented: true,
    hasContent: hasContent(certifications),
    accent: "yellow",
  },
  {
    id: "contact",
    label: "Contact",
    implemented: false,
    hasContent: hasContent(contacts),
    accent: "blue",
  },
];
export const visibleSections = homepageSections.filter(
  (section) =>
    section.implemented && (section.hasContent || section.showWhenEmpty),
);
export const developerCards: DeveloperCardContent[] = [
  {
    id: "development",
    title: "Software Development",
    description: "Turning ideas into thoughtful solutions.",
    note: "ideas → code",
  },
  {
    id: "security",
    title: "Cybersecurity",
    description: "A curious mind. A security-first perspective.",
    note: "Think like a defender.",
  },
  {
    id: "learning",
    title: "Continuous Learning",
    description: "Explore. Experiment. Keep growing.",
    note: "Always a work in progress.",
  },
];
export const homeContent = {
  greeting: "HEY THERE, I'M",
  aboutHeading: "More Than Just Code.",
  aboutLabel: "01 / A LITTLE ABOUT ME",
  aboutNote: "Curiosity is where it all starts.",
  values: ["Curiosity", "Creativity", "Cybersecurity"],
  projectNotice: "Project showcase coming soon.",
  footerNote: "Always curious. Always building.",
};

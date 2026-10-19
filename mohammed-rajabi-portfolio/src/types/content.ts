export interface Profile {
  name: string;
  headline: string;
  title: string;
  about: string;
  introduction: string;
  resume: { path: string; filename: string };
}
export interface HomepageSection {
  id: string;
  label: string;
  implemented: boolean;
  hasContent: boolean;
  accent: "blue" | "yellow" | "coral";
}
export interface DeveloperCardContent {
  id: "development" | "security" | "learning";
  title: string;
  description: string;
  note: string;
}
export interface Contact {
  label: string;
  value: string;
  href: string;
}
export interface Education {
  id: string;
  institution: string;
  qualification: string;
  period: string;
  status: string;
  gpa?: number;
}
export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}
export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  technologies: string[];
  image?: { src: string; alt: string };
  repositoryUrl?: string;
  liveUrl?: string;
}
export interface Experience {
  id: string;
  organization: string;
  role: string;
  period: string;
  description: string;
}
export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

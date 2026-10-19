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
  showWhenEmpty?: boolean;
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
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  technologies: string[];
  category?: string;
  screenshots?: ImageAsset[];
  repositoryUrl?: string;
  liveUrl?: string;
  completedAt?: string;
  features?: string[];
  featured: boolean;
  displayOrder: number;
}
export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  srcSet?: string;
  sizes?: string;
}
export interface Experience {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
  responsibilities?: string[];
}
export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: "certification" | "achievement";
  image?: ImageAsset;
  credentialUrl?: string;
}

import type { SkillCategory } from "../types/content";
export const skills: SkillCategory[] = [
  {
    id: "languages",
    name: "Programming Languages",
    skills: ["JavaScript", "Python", "Go", "Rust", "SQL", "HTML", "CSS"],
  },
  { id: "frontend", name: "Frontend Development", skills: ["Vue.js"] },
  {
    id: "backend",
    name: "Backend & Databases",
    skills: ["Go Backend", "REST APIs", "WebSockets", "SQLite"],
  },
  {
    id: "security",
    name: "Cybersecurity & Networking",
    skills: ["Linux", "Nmap", "Subfinder", "HTTPx", "Web Security"],
  },
  {
    id: "tools",
    name: "Developer Tools",
    skills: ["Git", "GitHub", "Docker", "VirtualBox"],
  },
];

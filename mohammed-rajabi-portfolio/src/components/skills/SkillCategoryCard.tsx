import {
  Code2,
  PanelsTopLeft,
  Database,
  ShieldCheck,
  Wrench,
  Terminal,
  GitBranch,
  GitFork,
  Container,
  Boxes,
  Radio,
  Network,
  Paintbrush,
  type LucideIcon,
} from "lucide-react";
import type { SkillCategory } from "../../types/content";
import { BrutalistCard } from "../ui/BrutalistCard";

const categories: Record<string, { icon: LucideIcon; accent: string }> = {
  languages: { icon: Code2, accent: "blue" },
  frontend: { icon: PanelsTopLeft, accent: "coral" },
  backend: { icon: Database, accent: "yellow" },
  security: { icon: ShieldCheck, accent: "charcoal" },
  tools: { icon: Wrench, accent: "cream" },
};
const technologyIcons: Record<string, LucideIcon> = {
  Git: GitBranch,
  GitHub: GitFork,
  Docker: Container,
  VirtualBox: Boxes,
  Linux: Terminal,
  SQLite: Database,
  SQL: Database,
  WebSockets: Radio,
  "REST APIs": Network,
  HTML: Code2,
  CSS: Paintbrush,
  "Vue.js": PanelsTopLeft,
};

export function SkillCategoryCard({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  const style = categories[category.id] ?? { icon: Code2, accent: "blue" };
  const Icon = style.icon;
  return (
    <BrutalistCard className={`skill-category lift-card skill-${category.id}`}>
      <div className={`skill-category-heading accent-${style.accent}`}>
        <span className="skill-number" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <Icon size={28} aria-hidden="true" />
        <h3>{category.name}</h3>
      </div>
      <ul className="skill-list">
        {category.skills.map((skill) => {
          const TechnologyIcon = technologyIcons[skill];
          return (
            <li key={skill}>
              {TechnologyIcon && (
                <TechnologyIcon size={16} aria-hidden="true" />
              )}
              <span>{skill}</span>
            </li>
          );
        })}
      </ul>
    </BrutalistCard>
  );
}

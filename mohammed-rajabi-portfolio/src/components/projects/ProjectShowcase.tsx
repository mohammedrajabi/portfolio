import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../../types/content";
import { BrutalistCard } from "../ui/BrutalistCard";
import { ProjectMedia } from "./ProjectMedia";
import { ProjectLinks } from "./ProjectLinks";
import { TechnologyTags } from "./TechnologyTags";
import { projectPath } from "../../utils/projects";

export function ProjectShowcase({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article
      className={`project-showcase ${index % 2 ? "showcase-reversed" : ""}`}
      aria-labelledby={`project-${project.id}`}
    >
      <ProjectMedia image={project.screenshots?.[0]} title={project.title} />
      <BrutalistCard className="showcase-copy">
        <p className="eyebrow">
          <span />
          {project.category ?? "PROJECT"}
          <small className="showcase-number" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </small>
        </p>
        <h3 id={`project-${project.id}`}>{project.title}</h3>
        <p className="showcase-summary">{project.summary}</p>
        <TechnologyTags technologies={project.technologies} />
        <div className="showcase-actions">
          <Link
            className="brutalist-button button-primary"
            to={projectPath(project.slug)}
            aria-label={`View details for ${project.title}`}
          >
            View Details <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
          <ProjectLinks project={project} />
        </div>
      </BrutalistCard>
    </article>
  );
}

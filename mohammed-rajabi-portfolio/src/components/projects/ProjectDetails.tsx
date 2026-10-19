import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import type { Project } from "../../types/content";
import { SectionContainer } from "../ui/SectionContainer";
import { ProjectMedia } from "./ProjectMedia";
import { ProjectLinks } from "./ProjectLinks";
import { TechnologyTags } from "./TechnologyTags";
import { formatContentDate } from "../../utils/dates";

export function ProjectDetails({ project }: { project: Project }) {
  const [cover, ...screenshots] = project.screenshots ?? [];
  return (
    <SectionContainer
      className="project-detail"
      aria-labelledby="project-title"
    >
      <Link className="project-back" to="/#projects">
        <ArrowLeft size={17} aria-hidden="true" />
        Back to Projects
      </Link>
      <header className="project-detail-header">
        {project.category && (
          <p className="eyebrow">
            <span />
            {project.category}
          </p>
        )}
        <h1 id="project-title">{project.title}</h1>
        <p className="project-detail-summary">{project.summary}</p>
        {project.completedAt && (
          <p className="project-date">
            Completed{" "}
            <time dateTime={project.completedAt}>
              {formatContentDate(project.completedAt)}
            </time>
          </p>
        )}
        <TechnologyTags technologies={project.technologies} />
        <ProjectLinks project={project} />
      </header>
      <ProjectMedia image={cover} title={project.title} priority />
      <div className="project-overview">
        <h2>Project Overview</h2>
        <p>{project.description}</p>
      </div>
      {!!project.features?.length && (
        <div className="project-features">
          <h2>Key Features</h2>
          <ul>
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
      {!!screenshots.length && (
        <div className="project-gallery">
          <h2>Project Screenshots</h2>
          <div className="project-gallery-grid">
            {screenshots.map((image) => (
              <ProjectMedia
                key={image.src}
                image={image}
                title={project.title}
              />
            ))}
          </div>
        </div>
      )}
      <Link className="brutalist-button button-primary" to="/#projects">
        <ArrowLeft size={17} aria-hidden="true" />
        Back to Projects
      </Link>
    </SectionContainer>
  );
}

import { GitFork, ArrowUpRight } from "lucide-react";
import type { Project } from "../../types/content";
import { externalUrl } from "../../utils/projects";

export function ProjectLinks({ project }: { project: Project }) {
  const repository = externalUrl(project.repositoryUrl);
  const demo = externalUrl(project.liveUrl);
  if (!repository && !demo) return null;
  return (
    <div className="project-external-links">
      {repository && (
        <a
          className="brutalist-button button-secondary"
          href={repository}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`GitHub repository for ${project.title} (opens in a new tab)`}
        >
          GitHub <GitFork size={17} aria-hidden="true" />
        </a>
      )}
      {demo && (
        <a
          className="brutalist-button button-secondary"
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Live demo of ${project.title} (opens in a new tab)`}
        >
          Live Demo <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

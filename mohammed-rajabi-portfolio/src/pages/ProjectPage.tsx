import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { projects } from "../content/projects";
import { SectionContainer } from "../components/ui/SectionContainer";
import { ProjectDetails } from "../components/projects/ProjectDetails";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { profile } from "../content/profile";

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  usePageMetadata(
    `${project?.title ?? "Project not found"} — ${profile.name}`,
    project?.summary ?? "No project has been published at this address.",
  );
  if (project) return <ProjectDetails project={project} />;
  return (
    <SectionContainer className="route-placeholder">
      <p className="eyebrow">PROJECT NOT FOUND</p>
      <h1>No project at this address.</h1>
      <p>
        This project has not been published. You can return to the homepage to
        explore the portfolio.
      </p>
      <Link className="brutalist-button button-primary" to="/#projects">
        <ArrowLeft size={17} aria-hidden="true" />
        Back to Projects
      </Link>
    </SectionContainer>
  );
}

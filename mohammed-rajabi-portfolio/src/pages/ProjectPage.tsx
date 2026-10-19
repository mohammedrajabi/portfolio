import { Link, useParams } from "react-router";
import { projects } from "../content/projects";
import { SectionContainer } from "../components/ui/SectionContainer";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { profile } from "../content/profile";
export default function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  usePageMetadata(
    (project?.title ?? "Project not found") + " — " + profile.name,
    project?.summary ?? "No project has been published at this address.",
  );
  return (
    <SectionContainer className="route-placeholder">
      <p className="eyebrow">PROJECT DETAILS</p>
      <h1>{project?.title ?? "No project here. Yet."}</h1>
      <p>
        {project?.summary ??
          "Projects will appear when verified content is added. This address does not match a published project."}
      </p>
      <Link className="brutalist-button button-primary" to="/">
        Back to home
      </Link>
    </SectionContainer>
  );
}

import { FolderCode, Sparkles } from "lucide-react";
import { SectionContainer } from "../components/ui/SectionContainer";
import { SectionHeading } from "../components/ui/SectionHeading";
import { BrutalistCard } from "../components/ui/BrutalistCard";
import { ProjectShowcase } from "../components/projects/ProjectShowcase";
import { projects } from "../content/projects";
import { sectionContent } from "../content/sections";
import { getFeaturedProjects } from "../utils/projects";

export function ProjectsSection() {
  const featured = getFeaturedProjects(projects);
  return (
    <div className="projects-band">
      <SectionContainer
        id="projects"
        tabIndex={-1}
        aria-labelledby="projects-heading"
        className="portfolio-section"
      >
        <SectionHeading
          id="projects-heading"
          number="03"
          title={sectionContent.projects.title}
          description={sectionContent.projects.description}
        />
        {featured.length ? (
          <div className="project-showcases">
            {featured.map((project, index) => (
              <ProjectShowcase
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        ) : (
          <BrutalistCard className="projects-empty">
            <div className="empty-art" aria-hidden="true">
              <span className="empty-art-tab" />
              <FolderCode size={64} strokeWidth={1.5} />
              <Sparkles size={25} className="empty-art-spark" />
            </div>
            <div className="empty-copy">
              <p className="eyebrow">{sectionContent.projects.emptyLabel}</p>
              <h3>{sectionContent.projects.emptyTitle}</h3>
              <p>{sectionContent.projects.emptyDescription}</p>
            </div>
          </BrutalistCard>
        )}
      </SectionContainer>
    </div>
  );
}

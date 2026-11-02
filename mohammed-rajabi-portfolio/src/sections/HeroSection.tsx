import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { Link } from "react-router";
import { SectionContainer } from "../components/ui/SectionContainer";
import { BrutalistButton } from "../components/ui/BrutalistButton";
import { TechnologyVisual } from "../components/hero/TechnologyVisual";
import { profile } from "../content/profile";
import { homeContent, visibleSections } from "../content/home";

export function HeroSection() {
  const contactAvailable = visibleSections.some(
    (section) => section.id === "contact",
  );
  const projectsAvailable = visibleSections.some(
    (section) => section.id === "projects",
  );
  return (
    <SectionContainer
      id="home"
      tabIndex={-1}
      className="hero-section"
      aria-labelledby="hero-heading"
    >
      <div className="hero-copy">
        <p className="eyebrow">
          <span />
          {homeContent.greeting}
        </p>
        <h1 id="hero-heading" className="hero-name">{profile.name}</h1>
        <p className="hero-headline">
          {profile.headline.match(/[^.]+\./g)?.map((line, index) => (
            <span key={line} className={`headline-line headline-${index}`}>
              {line.trim()}{" "}
            </span>
          ))}
        </p>
        <p className="hero-title">{profile.title}</p>
        <p className="hero-introduction">{profile.introduction}</p>
        <div className="hero-actions">
          {projectsAvailable ? (
            <Link to="/#projects" className="brutalist-button button-primary">
              Explore Projects <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          ) : (
            <BrutalistButton disabled aria-describedby="projects-status">
              Explore Projects <ArrowUpRight size={18} aria-hidden="true" />
            </BrutalistButton>
          )}
          {contactAvailable && (
            <Link className="brutalist-button button-secondary" to="/#contact">
              Contact Me <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          )}
          {__RESUME_AVAILABLE__ && (
            <a
              className="brutalist-button button-secondary"
              href={profile.resume.path}
              download={profile.resume.filename}
            >
              Download CV <Download size={18} aria-hidden="true" />
            </a>
          )}
        </div>
        {!projectsAvailable && (
          <p id="projects-status" className="projects-status">
            {homeContent.projectNotice}
          </p>
        )}
        <Link to="/#about" className="hero-scroll">
          A little more about me <ArrowDown size={16} aria-hidden="true" />
        </Link>
      </div>
      <TechnologyVisual />
    </SectionContainer>
  );
}

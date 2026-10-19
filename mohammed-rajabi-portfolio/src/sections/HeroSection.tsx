import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { Link } from "react-router";
import { SectionContainer } from "../components/ui/SectionContainer";
import { BrutalistButton } from "../components/ui/BrutalistButton";
import { DeveloperCards } from "../components/hero/DeveloperCards";
import { profile } from "../content/profile";
import { contacts } from "../content/contact";
import { homeContent, visibleSections } from "../content/home";

export function HeroSection() {
  const email = contacts.find((contact) => contact.label === "Email");
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
        <p className="hero-name">
          {profile.name}
          <span className="name-wave" aria-hidden="true">
            ↗
          </span>
        </p>
        <h1 id="hero-heading" aria-label={profile.headline}>
          {profile.headline.match(/[^.]+\./g)?.map((line, index) => (
            <span key={line} className={`headline-line headline-${index}`}>
              {line.trim()}{" "}
            </span>
          ))}
        </h1>
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
          {email && (
            <a className="brutalist-button button-secondary" href={email.href}>
              Contact Me <ArrowUpRight size={18} aria-hidden="true" />
            </a>
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
      <DeveloperCards />
    </SectionContainer>
  );
}

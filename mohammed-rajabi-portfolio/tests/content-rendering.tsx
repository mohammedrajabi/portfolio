import assert from "node:assert/strict";
import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import { skills } from "../src/content/skills";
import { education } from "../src/content/education";
import { projects } from "../src/content/projects";
import { experience } from "../src/content/experience";
import { certifications } from "../src/content/certifications";
import { contacts } from "../src/content/contact";
import { profile } from "../src/content/profile";
import { resume } from "../src/content/resume";
import { ContactCard } from "../src/components/contact/ContactCard";
import { CopyFeedback } from "../src/components/contact/CopyFeedback";
import { HeroSection } from "../src/sections/HeroSection";
import { BackToTop } from "../src/components/navigation/BackToTop";
import { copyText } from "../src/utils/clipboard";
import { visibleSections } from "../src/content/home";
import { SkillCategoryCard } from "../src/components/skills/SkillCategoryCard";
import { EducationCard } from "../src/components/journey/EducationCard";
import { ExperienceCard } from "../src/components/journey/ExperienceCard";
import { CertificationCard } from "../src/components/certifications/CertificationCard";
import { ProjectDetails } from "../src/components/projects/ProjectDetails";
import { ProjectShowcase } from "../src/components/projects/ProjectShowcase";
import { ExperienceSection } from "../src/sections/ExperienceSection";
import { CertificationsSection } from "../src/sections/CertificationsSection";
import {
  externalUrl,
  getFeaturedProjects,
  projectPath,
} from "../src/utils/projects";
import type { Project } from "../src/types/content";

// Isolated rendering fixtures never enter the portfolio collections or public routes.
const fixture: Project = {
  id: "render-test",
  slug: "render-test",
  title: "Render test only",
  summary: "Short test text",
  description: "Full test text",
  technologies: ["Test technology"],
  featured: true,
  displayOrder: 2,
};
const wrap = (node: ReactNode) =>
  renderToStaticMarkup(<MemoryRouter>{node}</MemoryRouter>);

export async function validateContentRendering() {
  const email = contacts.find((contact) => contact.kind === "email")!;
  assert.deepEqual(
    contacts.map((contact) => contact.href),
    [
      "mailto:mohammedrajabi.tech@gmail.com",
      "https://github.com/mohammedrajabi",
      "https://www.linkedin.com/in/mohammed-abbas-4b095b391/",
    ],
  );
  assert.deepEqual(
    contacts.map((contact) => contact.accent),
    ["yellow", "blue", "coral"],
  );
  assert.equal(profile.resume, resume);
  assert.equal(resume.path, "/resume/Mohammed_Rajabi_CV.pdf");
  const contactMarkup = contacts
    .map((contact) => renderToStaticMarkup(<ContactCard contact={contact} />))
    .join("");
  assert.equal(
    (contactMarkup.match(/rel="noopener noreferrer"/g) ?? []).length,
    2,
  );
  assert.match(contactMarkup, /Copy email/);
  assert.match(contactMarkup, /role="status"/);
  assert.doesNotMatch(
    contactMarkup,
    /Copied!|Email address copied to clipboard/,
  );
  const failureMarkup = renderToStaticMarkup(
    <CopyFeedback status="error" email={email.value} id="test-feedback" />,
  );
  assert.match(failureMarkup, /Copy unavailable/);
  assert.match(failureMarkup, /readonly=""/i);
  assert.match(failureMarkup, /aria-describedby="test-feedback"/);
  assert.doesNotMatch(failureMarkup, /Email address copied to clipboard/);
  assert.match(wrap(<HeroSection />), /href="\/#contact"/);
  assert.doesNotMatch(wrap(<BackToTop />), /aria-label="Back to top"/);
  await assert.rejects(copyText(email.value), /Clipboard unavailable/);
  await assert.rejects(
    copyText(email.value, {
      writeText: async () => {
        throw new Error("Permission denied");
      },
    }),
    /Permission denied/,
  );
  let resolveWrite!: () => void;
  let copied = false;
  let requestedText = "";
  const pendingWrite = new Promise<void>((resolve) => {
    resolveWrite = resolve;
  });
  const copying = copyText(email.value, {
    writeText: (text) => {
      requestedText = text;
      return pendingWrite;
    },
  }).then(() => {
    copied = true;
  });
  await Promise.resolve();
  assert.equal(requestedText, email.value);
  assert.equal(
    copied,
    false,
    "Pending clipboard writes must not report success",
  );
  resolveWrite();
  await copying;
  assert.equal(copied, true);
  const skillMarkup = skills
    .map((category, index) =>
      renderToStaticMarkup(
        <SkillCategoryCard category={category} index={index} />,
      ),
    )
    .join("");
  assert.equal(skills.length, 5);
  assert.equal((skillMarkup.match(/<li>/g) ?? []).length, 21);
  assert.deepEqual(
    skills.flatMap((category) => category.skills),
    [
      "JavaScript",
      "Python",
      "Go",
      "Rust",
      "SQL",
      "HTML",
      "CSS",
      "Vue.js",
      "Go Backend",
      "REST APIs",
      "WebSockets",
      "SQLite",
      "Linux",
      "Nmap",
      "Subfinder",
      "HTTPx",
      "Web Security",
      "Git",
      "GitHub",
      "Docker",
      "VirtualBox",
    ],
  );
  assert.equal(education.length, 2);
  const educationMarkup = education
    .map((record, index) =>
      renderToStaticMarkup(<EducationCard record={record} index={index} />),
    )
    .join("");
  assert.equal((educationMarkup.match(/Current GPA/g) ?? []).length, 1);
  assert.match(educationMarkup, /3\.7/);
  assert.match(educationMarkup, /2024–2029 \(expected\)/);
  assert.match(educationMarkup, /2025–2027 \(expected\)/);
  assert.equal(
    new Set(projects.map((project) => project.slug)).size,
    projects.length,
  );
  assert.equal(
    new Set(projects.map((project) => project.id)).size,
    projects.length,
  );
  for (const project of projects) {
    assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(project.title && project.summary && project.description);
    assert.ok(Number.isFinite(project.displayOrder));
    for (const url of [project.repositoryUrl, project.liveUrl])
      if (url) assert.ok(externalUrl(url));
    for (const image of project.screenshots ?? [])
      assert.ok(image.src && image.alt && image.width > 0 && image.height > 0);
  }
  if (!experience.length)
    assert.equal(renderToStaticMarkup(<ExperienceSection />), "");
  if (!certifications.length)
    assert.equal(renderToStaticMarkup(<CertificationsSection />), "");
  assert.deepEqual(
    visibleSections.map((section) => section.id),
    [
      "home",
      "about",
      "skills",
      "projects",
      ...(experience.length ? ["experience"] : []),
      "education",
      ...(certifications.length ? ["certifications"] : []),
      "contact",
    ],
  );
  const minimal = wrap(<ProjectDetails project={fixture} />);
  assert.match(minimal, /No screenshot provided/);
  assert.match(minimal, /Back to Projects/);
  assert.doesNotMatch(minimal, /<img|Live Demo|GitHub|Key Features/);
  const image = {
    src: "/__test-only__/image.svg",
    alt: "Test image only",
    width: 1200,
    height: 750,
    srcSet: "/__test-only__/image.svg 1200w",
    sizes: "100vw",
  };
  const rich: Project = {
    ...fixture,
    screenshots: [image, { ...image, src: "/__test-only__/second.svg" }],
    features: ["Optional feature text"],
    completedAt: "2025-01",
    repositoryUrl: "https://example.invalid/repository",
    liveUrl: "https://example.invalid/demo",
  };
  const full = wrap(<ProjectDetails project={rich} />);
  assert.match(full, /Key Features/);
  assert.match(full, /Project Screenshots/);
  assert.match(full, /Jan 2025/);
  assert.match(full, /srcSet=/i);
  assert.match(full, /loading="eager"/);
  assert.match(full, /loading="lazy"/);
  assert.match(full, /noopener noreferrer/);
  assert.match(full, /Live Demo/);
  const showcase = wrap(<ProjectShowcase project={fixture} index={1} />);
  assert.match(showcase, /showcase-reversed/);
  assert.match(showcase, /href="\/projects\/render-test"/);
  assert.match(showcase, /View Details/);
  assert.deepEqual(
    getFeaturedProjects([
      fixture,
      { ...fixture, id: "earlier", displayOrder: 1 },
      { ...fixture, id: "not-featured", featured: false },
    ]).map((project) => project.id),
    ["earlier", "render-test"],
  );
  assert.equal(externalUrl("javascript:alert(1)"), undefined);
  assert.equal(externalUrl("not a URL"), undefined);
  assert.equal(
    projectPath("path with spaces"),
    "/projects/path%20with%20spaces",
  );
  const work = renderToStaticMarkup(
    <ExperienceCard
      record={{
        id: "test-only",
        role: "Test role",
        organization: "Test organization",
        startDate: "2025-01",
        endDate: "2025-03",
        description: "Test description",
        responsibilities: ["Test responsibility"],
      }}
    />,
  );
  assert.match(work, /Jan 2025/);
  assert.match(work, /Mar 2025/);
  assert.match(work, /Test responsibility/);
  const credential = renderToStaticMarkup(
    <CertificationCard
      record={{
        id: "test-only",
        title: "Test only",
        issuer: "Test issuer",
        date: "2025",
        category: "achievement",
      }}
    />,
  );
  assert.match(credential, /Achievement/);
  assert.doesNotMatch(credential, /Verify credential|<img/);
  console.log(
    "Content rendering checks passed: exact skills and education, hidden collections, optional project media/links/features, ordering, and future card templates.",
  );
}

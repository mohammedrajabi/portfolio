import { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Code2,
  ShieldCheck,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { BrutalistButton } from "../components/ui/BrutalistButton";
import { BrutalistCard } from "../components/ui/BrutalistCard";
import { SectionContainer } from "../components/ui/SectionContainer";
import { SectionHeading } from "../components/ui/SectionHeading";
import { profile } from "../content/profile";
import { preview } from "../content/preview";
import { usePageMetadata } from "../hooks/usePageMetadata";
export default function HomePage() {
  const [pressed, setPressed] = useState(false);
  const reduced = useReducedMotion();
  usePageMetadata(
    profile.name + " — Foundation Preview",
    "A preview of the design foundation for Mohammed Rajabi’s developer portfolio.",
  );
  return (
    <>
      <SectionContainer className="intro" aria-labelledby="preview-title">
        <div className="intro-copy">
          <p className="eyebrow">
            <span />
            {preview.eyebrow}
          </p>
          <h1 id="preview-title">
            {preview.title[0]}
            <br />
            <span className="highlight">
              {preview.title[1]}
              <svg
                viewBox="0 0 360 18"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M3 11 Q170 -2 356 9 M20 16 Q190 4 330 14" />
              </svg>
            </span>
          </h1>
          <p className="intro-description">{preview.description}</p>
          <a className="text-link" href="#foundation">
            Explore the foundation <ArrowDown size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="identity-composition">
          <Sparkles
            className="outside-spark"
            size={45}
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <motion.div
            initial={false}
            animate={{ rotate: reduced ? 0 : -3 }}
            className="identity-card"
          >
            <div className="identity-bar">
              <span className="window-dots">
                <i />
                <i />
                <i />
              </span>
              <span>hello_world.ts</span>
              <Code2 size={18} aria-hidden="true" />
            </div>
            <div className="identity-body">
              <div className="identity-icon">
                <Code2 size={42} strokeWidth={2.2} aria-hidden="true" />
              </div>
              <p className="code-comment">// Meet the developer</p>
              <h2>{profile.name}</h2>
              <p className="identity-title">{profile.title}</p>
              <div className="identity-rule" />
              <p className="identity-headline">{profile.headline}</p>
            </div>
            <div className="identity-bottom">
              <span>
                <span className="status-dot" /> Curiosity, in progress.
              </span>
              <ShieldCheck size={19} aria-hidden="true" />
            </div>
          </motion.div>
          <span className="phase-sticker">
            PHASE <strong>{preview.phase}</strong>
            <span>{preview.phaseLabel}</span>
          </span>
          <span className="decor-cross" aria-hidden="true">
            ✳
          </span>
        </div>
      </SectionContainer>
      <div className="foundation-area" id="foundation">
        <SectionContainer aria-labelledby="palette-title">
          <SectionHeading
            id="palette-title"
            number="01"
            title="The color story"
            description="Five colors. Plenty of personality."
          />
          <div className="palette-grid">
            {preview.colors.map((color) => (
              <div
                className={"color-swatch " + color.className}
                key={color.name}
              >
                <span className="swatch-dot" />
                <div>
                  <h3>{color.name}</h3>
                  <span>{color.value}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>
        <SectionContainer aria-labelledby="building-title">
          <SectionHeading
            id="building-title"
            number="02"
            title="Made to build on"
            description="A small collection of reusable essentials."
          />
          <div className="component-grid">
            <BrutalistCard className="type-card">
              <span className="mini-label">01 / TYPOGRAPHY</span>
              <span className="type-specimen" aria-hidden="true">
                Aa<span>↗</span>
              </span>
              <h3>Bricolage Grotesque</h3>
              <p className="type-description">
                Expressive headings. A little unexpected.
              </p>
              <div className="type-divider" />
              <p className="body-specimen">Paired with DM Sans.</p>
              <p className="type-description">
                Clear, comfortable, and ready for the details.
              </p>
            </BrutalistCard>
            <BrutalistCard className="buttons-card">
              <span className="mini-label">02 / BUTTONS & INTERACTION</span>
              <h3>Go on. Give it a click.</h3>
              <p>Bold edges. A satisfying little shift.</p>
              <div className="button-examples">
                <BrutalistButton onClick={() => setPressed(true)}>
                  {pressed ? "Looking good!" : "Try me out"}
                  {pressed ? (
                    <Check size={18} aria-hidden="true" />
                  ) : (
                    <ArrowUpRight size={18} aria-hidden="true" />
                  )}
                </BrutalistButton>
                <BrutalistButton
                  variant="secondary"
                  onClick={() => setPressed(false)}
                >
                  Reset demo <RotateCcw size={16} aria-hidden="true" />
                </BrutalistButton>
              </div>
              <p role="status" className="demo-feedback">
                {pressed
                  ? "Click received. The foundation is working."
                  : "Keyboard friendly. Touch ready."}
              </p>
            </BrutalistCard>
            <BrutalistCard className="principles-card">
              <span className="mini-label">03 / THE DESIGN DNA</span>
              <Sparkles size={32} strokeWidth={1.5} aria-hidden="true" />
              <h3>
                Playful by design.
                <br />
                Solid at the core.
              </h3>
              <p>Thick borders, honest shadows, and room to breathe.</p>
              <div className="design-tags">
                <span>Accessible</span>
                <span>Responsive</span>
                <span>Theme ready</span>
              </div>
            </BrutalistCard>
          </div>
        </SectionContainer>
        <SectionContainer className="phase-note" aria-label="Phase status">
          <span className="phase-note-symbol" aria-hidden="true">
            ↳
          </span>
          <p>
            <strong>A foundation, with more to come.</strong> The complete
            homepage and portfolio sections arrive in the next phases.
          </p>
          <span className="phase-badge">PHASE 1 ONLY</span>
        </SectionContainer>
      </div>
      {__RESUME_AVAILABLE__ && (
        <SectionContainer aria-label="Resume">
          <a
            className="brutalist-button button-secondary"
            href={profile.resume.path}
            download={profile.resume.filename}
          >
            Download resume <ArrowDown size={18} aria-hidden="true" />
          </a>
        </SectionContainer>
      )}
    </>
  );
}

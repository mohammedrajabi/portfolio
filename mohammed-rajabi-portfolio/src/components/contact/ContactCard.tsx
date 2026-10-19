import { Mail, GitFork, ContactRound, ArrowUpRight } from "lucide-react";
import type { Contact } from "../../types/content";
import { BrutalistCard } from "../ui/BrutalistCard";
import { CopyEmailButton } from "./CopyEmailButton";
const icons = { email: Mail, github: GitFork, linkedin: ContactRound };

export function ContactCard({ contact }: { contact: Contact }) {
  const Icon = icons[contact.kind];
  const email = contact.kind === "email";
  return (
    <article
      className="contact-article"
      aria-labelledby={`contact-${contact.kind}`}
    >
      <BrutalistCard className={`contact-card contact-${contact.accent}`}>
        <span className="contact-icon">
          <Icon size={31} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <h3 id={`contact-${contact.kind}`}>{contact.label}</h3>
        <p className="contact-description">{contact.description}</p>
        {email ? (
          <>
            <a className="contact-email-address" href={contact.href}>
              <span>{contact.value}</span>
              <Mail size={17} aria-hidden="true" />
            </a>
            <CopyEmailButton email={contact.value} />
          </>
        ) : (
          <a
            className="brutalist-button button-secondary contact-profile-link"
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${contact.label} profile (opens in a new tab)`}
          >
            View {contact.label} profile{" "}
            <ArrowUpRight size={19} aria-hidden="true" />
          </a>
        )}
      </BrutalistCard>
    </article>
  );
}

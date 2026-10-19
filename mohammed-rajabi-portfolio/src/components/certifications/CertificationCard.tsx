import { Award, ArrowUpRight } from "lucide-react";
import type { Certification } from "../../types/content";
import { BrutalistCard } from "../ui/BrutalistCard";
import { externalUrl } from "../../utils/projects";
import { formatContentDate } from "../../utils/dates";
import { ProjectMedia } from "../projects/ProjectMedia";

export function CertificationCard({ record }: { record: Certification }) {
  const verification = externalUrl(record.credentialUrl);
  return (
    <BrutalistCard className="certificate-card lift-card">
      {record.image ? (
        <ProjectMedia image={record.image} title={record.title} />
      ) : (
        <span className="certificate-icon">
          <Award size={30} aria-hidden="true" />
        </span>
      )}
      <p className="certificate-category">
        {record.category === "achievement" ? "Achievement" : "Certification"}
      </p>
      <h3>{record.title}</h3>
      <p className="certificate-issuer">{record.issuer}</p>
      <time dateTime={record.date}>{formatContentDate(record.date)}</time>
      {verification && (
        <a
          className="certificate-verify"
          href={verification}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Verify ${record.title} (opens in a new tab)`}
        >
          Verify credential <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      )}
    </BrutalistCard>
  );
}

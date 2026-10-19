import { GraduationCap, Code2, ArrowUpRight } from "lucide-react";
import type { Education } from "../../types/content";
import { BrutalistCard } from "../ui/BrutalistCard";

export function EducationCard({
  record,
  index,
}: {
  record: Education;
  index: number;
}) {
  const Icon = index % 2 ? Code2 : GraduationCap;
  return (
    <BrutalistCard
      className={`journey-card lift-card education-card ${index % 2 ? "education-blue" : "education-yellow"}`}
    >
      <div className="journey-card-top">
        <span className="journey-icon">
          <Icon size={26} aria-hidden="true" />
        </span>
        <span className="study-status">
          <span aria-hidden="true" />
          {record.status}
        </span>
      </div>
      <p className="journey-period">{record.period}</p>
      <h3>{record.institution}</h3>
      <p className="journey-qualification">{record.qualification}</p>
      <div className="journey-card-bottom">
        {record.gpa !== undefined ? (
          <p>
            Current GPA <strong>{record.gpa}</strong>
          </p>
        ) : (
          <span>Program in progress</span>
        )}
        <ArrowUpRight size={23} aria-hidden="true" />
      </div>
    </BrutalistCard>
  );
}

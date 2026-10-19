import { BriefcaseBusiness } from "lucide-react";
import type { Experience } from "../../types/content";
import { BrutalistCard } from "../ui/BrutalistCard";
import { formatContentDate } from "../../utils/dates";

export function ExperienceCard({ record }: { record: Experience }) {
  return (
    <BrutalistCard className="journey-card lift-card experience-card">
      <div className="journey-card-top">
        <span className="journey-icon">
          <BriefcaseBusiness size={25} aria-hidden="true" />
        </span>
        <p className="journey-period">
          <time dateTime={record.startDate}>
            {formatContentDate(record.startDate)}
          </time>{" "}
          —{" "}
          {record.endDate ? (
            <time dateTime={record.endDate}>
              {formatContentDate(record.endDate)}
            </time>
          ) : (
            "Present"
          )}
        </p>
      </div>
      <h3>{record.role}</h3>
      <p className="journey-qualification">{record.organization}</p>
      <p className="experience-description">{record.description}</p>
      {!!record.responsibilities?.length && (
        <ul className="experience-responsibilities">
          {record.responsibilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </BrutalistCard>
  );
}

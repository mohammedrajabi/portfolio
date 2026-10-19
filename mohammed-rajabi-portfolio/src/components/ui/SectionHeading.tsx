export function SectionHeading({
  id,
  number,
  title,
  description,
}: {
  id: string;
  number: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="section-number">{number}</span>
        <h2 id={id}>{title}</h2>
      </div>
      {description && <p>{description}</p>}
    </div>
  );
}

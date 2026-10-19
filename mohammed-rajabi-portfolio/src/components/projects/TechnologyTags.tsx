export function TechnologyTags({
  technologies,
}: {
  technologies: readonly string[];
}) {
  if (!technologies.length) return null;
  return (
    <ul className="technology-tags" aria-label="Technologies used">
      {technologies.map((technology) => (
        <li key={technology}>{technology}</li>
      ))}
    </ul>
  );
}

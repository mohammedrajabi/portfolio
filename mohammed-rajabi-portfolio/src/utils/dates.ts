export function formatContentDate(value: string): string {
  if (/^\d{4}$/.test(value)) return value;
  if (!/^\d{4}-\d{2}(-\d{2})?$/.test(value)) return value;
  const date = new Date(
    `${value.length === 7 ? value + "-01" : value}T00:00:00Z`,
  );
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en", {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(date);
}

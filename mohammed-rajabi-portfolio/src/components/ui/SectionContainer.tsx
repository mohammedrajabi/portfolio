import type { ComponentPropsWithoutRef } from "react";
export function SectionContainer({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"section">) {
  return <section className={"section-container " + className} {...props} />;
}

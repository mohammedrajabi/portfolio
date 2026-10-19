import type { HTMLAttributes } from "react";
export function BrutalistCard({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={"brutalist-card " + className} {...props} />;
}

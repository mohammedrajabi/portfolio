import type { ReactNode } from "react";
import { hasContent } from "../../utils/content";
export function ContentGate<T>({
  items,
  children,
}: {
  items: readonly T[];
  children: ReactNode;
}) {
  return hasContent(items) ? children : null;
}

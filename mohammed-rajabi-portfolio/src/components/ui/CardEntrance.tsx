import type { ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";
export function CardEntrance({
  children,
  index = 0,
  className = "",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <m.div
      className={`card-entrance ${className}`}
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduced ? 0 : 0.3,
        delay: reduced ? 0 : Math.min(index * 0.06, 0.24),
      }}
    >
      {children}
    </m.div>
  );
}

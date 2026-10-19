import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { visibleSections } from "../content/home";

export function useActiveSection() {
  const { pathname } = useLocation();
  const [active, setActive] = useState("home");
  useEffect(() => {
    if (pathname !== "/") return;
    let frame = 0;
    const update = () => {
      const headerHeight =
        document.querySelector("header")?.getBoundingClientRect().height ?? 100;
      let current = "home";
      // The final section may never reach the header on a tall viewport.
      const atBottom =
        window.scrollY > 0 &&
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 3;
      for (const section of visibleSections) {
        const element = document.getElementById(section.id);
        if (
          element &&
          (element.getBoundingClientRect().top <= headerHeight + 100 ||
            atBottom)
        )
          current = section.id;
      }
      setActive(current);
      frame = 0;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);
  return pathname === "/" ? active : null;
}

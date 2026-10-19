import { useEffect } from "react";
import { useLocation } from "react-router";
import { visibleSections } from "../../content/home";

// Wait for lazy route content without timers; also supports direct /#about visits.
export function SectionNavigation() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (pathname !== "/" || !hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const id = hash.slice(1);
    if (!visibleSections.some((section) => section.id === id)) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame = 0;
    const scroll = () => {
      const target = document.getElementById(id);
      if (!target) return false;
      frame = requestAnimationFrame(() => {
        target.scrollIntoView({
          behavior: reduced ? "instant" : "smooth",
          block: "start",
        });
        target.focus({ preventScroll: true });
      });
      return true;
    };
    const observer = new MutationObserver(() => {
      if (scroll()) observer.disconnect();
    });
    if (!scroll())
      observer.observe(document.getElementById("root")!, {
        childList: true,
        subtree: true,
      });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [pathname, hash, key]);
  return null;
}

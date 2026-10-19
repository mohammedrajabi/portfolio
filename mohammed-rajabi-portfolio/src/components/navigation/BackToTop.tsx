import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { BrutalistButton } from "../ui/BrutalistButton";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const lastVisible = useRef(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const next = window.scrollY > Math.max(400, window.innerHeight * 0.6);
      if (next !== lastVisible.current) {
        lastVisible.current = next;
        setVisible(next);
      }
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
  const returnToTop = () => {
    if (pathname === "/") navigate("/#home", { replace: true });
    else {
      window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
      document.getElementById("main-content")?.focus({ preventScroll: true });
    }
  };
  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          className="back-to-top-wrap"
          initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduced ? 0 : 6 }}
          transition={{ duration: reduced ? 0 : 0.16 }}
        >
          <BrutalistButton
            className="back-to-top"
            aria-label="Back to top"
            onClick={returnToTop}
          >
            <ArrowUp size={22} aria-hidden="true" />
          </BrutalistButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

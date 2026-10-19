import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "../theme/ThemeToggle";
import { BrutalistButton } from "../ui/BrutalistButton";
import { profile } from "../../content/profile";
import { visibleSections } from "../../content/home";
import { useActiveSection } from "../../hooks/useActiveSection";

export function SiteHeader() {
  const location = useLocation();
  const [openAt, setOpenAt] = useState<string | null>(null);
  const isOpen = openAt === location.key;
  const header = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const active = useActiveSection();

  useEffect(() => {
    if (!header.current) return;
    const update = () =>
      document.documentElement.style.setProperty(
        "--header-height",
        `${header.current!.getBoundingClientRect().height}px`,
      );
    const observer = new ResizeObserver(update);
    observer.observe(header.current);
    update();
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--header-height");
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenAt(null);
        trigger.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        setOpenAt(null);
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onResize = () => {
      if (desktop.matches) setOpenAt(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      desktop.removeEventListener("change", onResize);
    };
  }, [isOpen]);

  const links = visibleSections.map((section) => (
    <Link
      key={section.id}
      to={`/#${section.id}`}
      className={`nav-link nav-${section.accent}`}
      aria-current={active === section.id ? "location" : undefined}
      onClick={() => setOpenAt(null)}
    >
      {section.label}
      <ArrowUpRight size={15} aria-hidden="true" />
    </Link>
  ));

  return (
    <header
      ref={header}
      className="site-header"
      onBlur={(event) => {
        if (
          isOpen &&
          event.relatedTarget instanceof Node &&
          !event.currentTarget.contains(event.relatedTarget)
        )
          setOpenAt(null);
      }}
    >
      <div className="header-inner">
        <Link
          to="/#home"
          className="wordmark"
          aria-label={`${profile.name} home`}
          onClick={() => setOpenAt(null)}
        >
          <span className="monogram" aria-hidden="true">
            mr.
          </span>
          <span className="brand-name">{profile.name}</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links}
        </nav>
        <div className="header-tools">
          <ThemeToggle />
          <BrutalistButton
            ref={trigger}
            className="menu-toggle"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setOpenAt(isOpen ? null : location.key)}
          >
            {isOpen ? (
              <X size={22} aria-hidden="true" />
            ) : (
              <Menu size={22} aria-hidden="true" />
            )}
          </BrutalistButton>
        </div>
      </div>
      <nav
        ref={panel}
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!isOpen}
      >
        {links}
      </nav>
    </header>
  );
}

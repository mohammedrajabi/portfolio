import { Outlet, Link } from "react-router";
import { Asterisk } from "lucide-react";
import { ThemeToggle } from "../components/theme/ThemeToggle";
import { profile } from "../content/profile";
import { preview } from "../content/preview";
export default function RootLayout() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <Link to="/" className="wordmark" aria-label={profile.name + " home"}>
          <span className="monogram">
            mr<span>.</span>
          </span>
          <span>{profile.name}</span>
        </Link>
        <div className="header-tools">
          <span className="preview-label">
            <span />
            {preview.status}
          </span>
          <ThemeToggle />
        </div>
      </header>
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <span>
          {profile.name}
          <span className="footer-dot"> / </span>Built with curiosity.
        </span>
        <span>
          <Asterisk size={16} aria-hidden="true" /> Phase 01 — the beginning
        </span>
      </footer>
    </>
  );
}

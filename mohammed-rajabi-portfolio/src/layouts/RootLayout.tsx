import { Outlet } from "react-router";
import { Asterisk } from "lucide-react";
import { SiteHeader } from "../components/navigation/SiteHeader";
import { SectionNavigation } from "../components/navigation/SectionNavigation";
import { BackToTop } from "../components/navigation/BackToTop";
import { profile } from "../content/profile";
import { homeContent } from "../content/home";

export default function RootLayout() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SectionNavigation />
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <span>
          {profile.name}
          <span className="footer-dot"> / </span>
          {homeContent.footerNote}
        </span>
        <span>
          <Asterisk size={18} aria-hidden="true" /> Made with intention.
        </span>
      </footer>
      <BackToTop />
    </>
  );
}

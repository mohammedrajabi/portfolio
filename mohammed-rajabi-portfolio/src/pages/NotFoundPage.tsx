import { Link } from "react-router";
import { SectionContainer } from "../components/ui/SectionContainer";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { profile } from "../content/profile";
export default function NotFoundPage() {
  usePageMetadata(
    "Page not found — " + profile.name,
    "This page could not be found. Return to the portfolio foundation preview.",
  );
  return (
    <SectionContainer className="route-placeholder">
      <p className="eyebrow">404 / LOST IN THE BUILD</p>
      <h1>A little off course.</h1>
      <p>This page does not exist. Let’s get you back.</p>
      <Link className="brutalist-button button-primary" to="/">
        Back to the foundation
      </Link>
    </SectionContainer>
  );
}

import { Link } from "react-router";
import { SectionContainer } from "../components/ui/SectionContainer";
import { usePageMetadata } from "../hooks/usePageMetadata";
export default function NotFoundPage() {
  usePageMetadata();
  return (
    <SectionContainer className="route-placeholder">
      <p className="eyebrow">404 / LOST IN THE BUILD</p>
      <h1>A little off course.</h1>
      <p>This page does not exist. Let’s get you back.</p>
      <Link className="brutalist-button button-primary" to="/">
        Back to home
      </Link>
    </SectionContainer>
  );
}

import { lazy, Suspense } from 'react';
import { BrowserRouter } from 'react-router';
import { PortfolioRoutes } from './routes';
import { AnimationProvider } from './components/AnimationProvider';
const HomePage = lazy(() => import('./pages/HomePage'));
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
export default function App() {
  return <AnimationProvider><BrowserRouter><Suspense fallback={<p className="loading" role="status">Loading portfolio…</p>}><PortfolioRoutes HomePage={HomePage} ProjectPage={ProjectPage} NotFoundPage={NotFoundPage} /></Suspense></BrowserRouter></AnimationProvider>;
}

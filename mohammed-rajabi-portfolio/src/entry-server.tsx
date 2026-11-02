import { renderToString } from 'react-dom/server';
import { Suspense } from 'react';
import { StaticRouter } from 'react-router';
import { PortfolioRoutes } from './routes';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { AnimationProvider } from './components/AnimationProvider';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import NotFoundPage from './pages/NotFoundPage';
export { getPageMetadata, personSchemaJson, siteUrl } from './content/seo';
export { projects } from './content/projects';
export function renderPage(path: string) {
  return renderToString(<ThemeProvider><AnimationProvider><StaticRouter location={path}><Suspense><PortfolioRoutes HomePage={HomePage} ProjectPage={ProjectPage} NotFoundPage={NotFoundPage} /></Suspense></StaticRouter></AnimationProvider></ThemeProvider>);
}

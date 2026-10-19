import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { MotionConfig } from "motion/react";
import RootLayout from "./layouts/RootLayout";
const HomePage = lazy(() => import("./pages/HomePage"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Suspense
          fallback={
            <p className="loading" role="status">
              Loading the foundation…
            </p>
          }
        >
          <Routes>
            <Route element={<RootLayout />}>
              <Route index element={<HomePage />} />
              <Route path="projects/:slug" element={<ProjectPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MotionConfig>
  );
}

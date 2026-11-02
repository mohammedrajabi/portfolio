import type { ComponentType } from 'react';
import { Route, Routes } from 'react-router';
import RootLayout from './layouts/RootLayout';
export function PortfolioRoutes({ HomePage, ProjectPage, NotFoundPage }: { HomePage: ComponentType; ProjectPage: ComponentType; NotFoundPage: ComponentType }) {
  return <Routes><Route element={<RootLayout />}><Route index element={<HomePage />} /><Route path="projects/:slug" element={<ProjectPage />} /><Route path="*" element={<NotFoundPage />} /></Route></Routes>;
}

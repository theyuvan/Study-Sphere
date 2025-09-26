import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Authentication from './pages/authentication';
import AIQAInterface from './pages/ai-q-a-interface';
import AnalyticsDashboard from './pages/analytics-dashboard';
import LandingPage from './pages/landing-page';
import Dashboard from './pages/dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/ai-q-a-interface" element={<AIQAInterface />} />
        <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

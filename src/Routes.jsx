import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import StudySphereLayout from './components/StudySphereLayout';
import StudyDashboard from './pages/StudyDashboard';
import LibraryPage from './pages/LibraryPage';
import UploadPage from './pages/UploadPage';
import SearchPage from './pages/SearchPage';
import QuizPage from './pages/QuizPage';
import SchedulePage from './pages/SchedulePage';
import ProgressPage from './pages/ProgressPage';
import LeaderboardPage from './pages/LeaderboardPage';

// Placeholder component for library
// const LibraryPage = () => <div className="p-8"><h2 className="text-2xl font-black">Library - Coming Soon</h2></div>;

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* StudySphere App Routes with Layout */}
          <Route path="/" element={<StudySphereLayout />}>
            <Route index element={<StudyDashboard />} />
            <Route path="library" element={<LibraryPage />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="quiz" element={<QuizPage />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="progress" element={<ProgressPage />} />
            <Route path="leaderboard" element={<LeaderboardPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

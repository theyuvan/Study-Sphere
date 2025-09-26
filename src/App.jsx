import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import ScrollToTop from './components/ScrollToTop'

// Page imports
import LandingPage from './pages/landing-page'
import Authentication from './pages/authentication'
import Dashboard from './pages/dashboard'
import AIQAInterface from './pages/ai-q-a-interface'
import AnalyticsDashboard from './pages/analytics-dashboard'
import NotFound from './pages/NotFound'

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/*" element={<Authentication />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ai-chat" element={<AIQAInterface />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ErrorBoundary>
  )
}

export default App
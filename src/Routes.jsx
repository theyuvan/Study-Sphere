import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Import page components
import LandingPage from './pages/landing-page'
import Authentication from './pages/authentication'
import Dashboard from './pages/dashboard'
import AIQAInterface from './pages/ai-q-a-interface'
import AnalyticsDashboard from './pages/analytics-dashboard'
import NotFound from './pages/NotFound'

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }
  
  return children
}

// Public Route wrapper (redirect if already authenticated)
const PublicRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }
  
  return children
}

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/" 
        element={
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        } 
      />
      
      <Route 
        path="/auth/*" 
        element={
          <PublicRoute>
            <Authentication />
          </PublicRoute>
        } 
      />

      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/ai-chat" 
        element={
          <ProtectedRoute>
            <AIQAInterface />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/analytics" 
        element={
          <ProtectedRoute>
            <AnalyticsDashboard />
          </ProtectedRoute>
        } 
      />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
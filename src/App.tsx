import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TopMenu } from './components/layout/TopMenu';
import { Footer } from './components/layout/Footer';
import { JobSearch } from './pages/JobSearch';
import { CompanySearch } from './pages/CompanySearch';
import { identityForm } from './pages/identityForm';
import { Tools } from './pages/Tools';
import { HowItWorks } from './pages/HowItWorks';
import { Privacy } from './pages/Privacy';
import { About } from './pages/About';
import { Identities } from './pages/Identities';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { identityProvider } from './contexts/identityContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <identityProvider>
        <Router>
          <div className="min-h-screen bg-background flex flex-col">
            <TopMenu />
            <div className="flex-1 mt-16">
              <Routes>
                {/* Public Routes */}
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/about" element={<About />} />

                {/* Protected Routes */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <identityForm />
                  </ProtectedRoute>
                } />
                <Route path="/jobs" element={
                  <ProtectedRoute>
                    <JobSearch />
                  </ProtectedRoute>
                } />
                <Route path="/companies" element={
                  <ProtectedRoute>
                    <CompanySearch />
                  </ProtectedRoute>
                } />
                <Route path="/tools" element={
                  <ProtectedRoute>
                    <Tools />
                  </ProtectedRoute>
                } />
                <Route path="/identities" element={
                  <ProtectedRoute>
                    <Identities />
                  </ProtectedRoute>
                } />

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </identityProvider>
    </AuthProvider>
  );
}

export default App;
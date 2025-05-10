import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import CodeEntryScreen from './components/auth/CodeEntryScreen';
import ReviewerSelection from './components/reviewers/ReviewerSelection';
import SubjectSelection from './components/subjects/SubjectSelection';
import LessonsList from './components/lessons/LessonsList';
import PracticeTest from './components/tests/PracticeTest';
import './App.css';

// Protected route component to handle authentication
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public route */}
            <Route path="/" element={<CodeEntryScreen />} />
            
            {/* Protected routes */}
            <Route 
              path="/reviewers" 
              element={
                <ProtectedRoute>
                  <ReviewerSelection />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/reviewers/:reviewerId" 
              element={
                <ProtectedRoute>
                  <SubjectSelection />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/reviewers/:reviewerId/:subjectId" 
              element={
                <ProtectedRoute>
                  <LessonsList />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/reviewers/:reviewerId/:subjectId/:lessonId/test" 
              element={
                <ProtectedRoute>
                  <PracticeTest />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
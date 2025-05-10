import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LockKeyhole } from 'lucide-react';

const CodeEntryScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // If already authenticated, redirect to reviewers page
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/reviewers');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // Simulate a slight delay for better UX
    setTimeout(() => {
      const success = login(code);
      
      if (success) {
        navigate('/reviewers');
      } else {
        setError('Invalid access code. Please try again.');
      }
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <LockKeyhole size={32} />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Enter Access Code
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label 
                htmlFor="code" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Access Code
              </label>
              <input
                type="password"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your code"
                required
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">
                  {error}
                </p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || !code}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
                isSubmitting || !code
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              }`}
            >
              {isSubmitting ? 'Verifying...' : 'Access Content'}
            </button>
          </form>
          
          <p className="mt-6 text-center text-sm text-gray-600">
            This content is protected. Please enter the access code provided by your instructor.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CodeEntryScreen;
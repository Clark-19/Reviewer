import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the correct access code - in a real app, this would be server-validated
const CORRECT_CODE = 'eduportal123';

// Define the auth context type
interface AuthContextType {
  isAuthenticated: boolean;
  login: (code: string) => boolean;
  logout: () => void;
}

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Check local storage for authentication state on initial load
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth === 'true';
  });

  // Update local storage whenever auth state changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  // Login function to verify the access code
  const login = (code: string): boolean => {
    const isValid = code === CORRECT_CODE;
    if (isValid) {
      setIsAuthenticated(true);
    }
    return isValid;
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
  };

  // Provide the auth context to children components
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
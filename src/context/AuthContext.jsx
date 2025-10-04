import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const checkAuthStatus = () => {
      try {
        const user = sessionStorage.getItem('user');
        const authStatus = sessionStorage.getItem('isAuthenticated');
        
        if (user && authStatus === 'true') {
          setCurrentUser(JSON.parse(user));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Clear invalid data
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('isAuthenticated');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    sessionStorage.setItem('user', JSON.stringify(userData));
    sessionStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('isAuthenticated');
  };

  const updateUser = (userData) => {
    setCurrentUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  const value = {
    currentUser,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
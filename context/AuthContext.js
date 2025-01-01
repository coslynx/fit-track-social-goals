// AuthContext.js
// This context provides user authentication state management,
// including the user object and authentication token.
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      try {
        setToken(storedToken);
      } catch (err) {
          console.error('Error setting token from local storage:', err);
      }
    }
  }, [setToken]);

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
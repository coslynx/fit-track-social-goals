import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login as authLogin, register as authRegister } from '../services/auth';

const useAuth = () => {
  const { user, setUser, token, setToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authLogin(username, password);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('authToken', data.token);
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authRegister(username, password);
        setUser(data.user);
        setToken(data.token);
      localStorage.setItem('authToken', data.token);
    } catch (err) {
      console.error('Registration failed:', err);
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };


  const logout = () => {
    setIsLoading(true);
    setError(null);
    try {
        setUser(null);
        setToken(null);
      localStorage.removeItem('authToken');
    } catch (err) {
        console.error('Logout failed:', err);
        setError(err.message || 'Logout failed');
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      try {
        setToken(storedToken);
        // Ideally, you would fetch user data here using the stored token
        // For MVP, we can assume the token is valid and the user is authenticated
          // For a production app, use storedToken to fetch user data
      } catch (err) {
          console.error('Error setting user from local storage:', err);
      }
    }
  }, [setToken, setUser]);

  return {
    user,
    token,
    isLoading,
    error,
    login,
    register,
    logout,
  };
};

export default useAuth;
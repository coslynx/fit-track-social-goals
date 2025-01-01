import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import AuthForm from '../components/auth/AuthForm';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PropTypes from 'prop-types';
import { sanitizeInput } from '../utils/helpers';

/**
 * Profile Component
 *
 * A functional component for handling user authentication and displaying user details.
 * It renders a login/register form for unauthenticated users and user details when authenticated.
 * Utilizes useAuth for authentication, useNavigate for redirection, and AuthForm for login/register form.
 * Handles loading, error, and logout operations gracefully.
 *
 * @returns {JSX.Element} The Profile component.
 *
 * @example
 * <Profile />
 */
const Profile = React.memo(() => {
    // Get user, logout function, and auth status from useAuth hook
    const { user, logout, error } = useAuth();
    // Initialize navigate for redirection
    const navigate = useNavigate();


    // Check for user authentication, redirect if logged in
    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);


    // Function to handle logout button clicks
    const handleLogout = useCallback(async (event) => {
         event.preventDefault();
        try {
            await logout();
            navigate('/');
        } catch (err) {
            console.error("Logout error:", err);
        }
    }, [logout, navigate]);

    // Sanitize user details before rendering
     const sanitizedUsername = user ? sanitizeInput(user.username) : '';

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="container mx-auto max-w-md text-center">
                  {error && <p className="text-center text-red-500">Error: {error}</p>}
                    {!user ? (
                         <AuthForm />
                    ) : (
                        <div>
                            <h1 className="text-3xl font-bold mb-4">
                                Welcome, {sanitizedUsername}
                            </h1>
                              <button
                                  onClick={handleLogout}
                                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                  role="button"
                                  tabIndex="0"
                                  >
                                     Logout
                                </button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
});


// Define PropTypes for type checking and documentation purposes.
Profile.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string,
        username: PropTypes.string,
    }),
    logout: PropTypes.func,
     error: PropTypes.string,
};


export default Profile;
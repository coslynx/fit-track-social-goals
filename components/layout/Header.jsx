import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Button from '../common/Button';
import PropTypes from 'prop-types';

/**
 * Header Component
 *
 * A functional component for the main application header, including navigation links and user authentication status display.
 * It uses React Router's `Link` for navigation and the `useAuth` hook for authentication context.
 *
 * The component displays navigation links to the Dashboard, Goals, and Profile pages.
 * When a user is not authenticated, it renders a Login button that navigates to the profile page.
 * When a user is authenticated, it renders a Logout button that calls the logout function from the `useAuth` hook on click.
 *
 * @returns {JSX.Element} The Header component.
 *
 * @example
 * <Header />
 */
const Header = React.memo(() => {
    const { user, logout } = useAuth();

    // Function to handle logout button clicks
    const handleLogout = (event) => {
        event.preventDefault();
        try {
            logout();
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <header className="flex justify-between items-center p-4 bg-gray-100">
            <nav className="flex space-x-4">
                <Link to="/dashboard" role="link">Dashboard</Link>
                <Link to="/goals" role="link">Goals</Link>
                <Link to="/profile" role="link">Profile</Link>
            </nav>
            <div>
                {user ? (
                    <Button onClick={handleLogout} role="button">
                        Logout
                    </Button>
                ) : (
                  <Link to="/profile" role="button">
                     Login
                  </Link>
                )}
            </div>
        </header>
    );
});


// Define PropTypes for type checking and documentation purposes.
Header.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string,
        username: PropTypes.string,
    }),
    logout: PropTypes.func,
};

export default Header;
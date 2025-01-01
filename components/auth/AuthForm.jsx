import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import useAuth from '../../hooks/useAuth';
import Input from '../common/Input';
import Button from '../common/Button';

/**
 * AuthForm Component
 *
 * A functional component for user authentication, providing a form for both
 * registration and login. It utilizes the `useAuth` hook for authentication logic,
 * `Input` component for form fields, and `Button` for actions.
 *
 * The component manages form state for username and password, and toggles between login
 * and register forms. Handles loading and error states returned from useAuth and provides
 * user-friendly feedback.
 *
 * @returns {JSX.Element} The AuthForm component.
 *
 * @example
 * <AuthForm />
 */
const AuthForm = React.memo(() => {
  // Define state for username, password, form type and errors
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formType, setFormType] = useState('login');
  // Use the useAuth hook for authentication logic
  const { isLoading, error, login, register } = useAuth();

  // Define function to handle username changes
  const handleUsernameChange = useCallback((value) => {
    setUsername(value);
  }, []);

  // Define function to handle password changes
  const handlePasswordChange = useCallback((value) => {
    setPassword(value);
  }, []);


  // Define function to handle form submission
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
       // Trim username and password before submit
      const trimmedUsername = username.trim();
      const trimmedPassword = password.trim();
      // Validate if username and password are not empty before submitting
      if (!trimmedUsername || !trimmedPassword) {
        return;
      }
       // Call login or register function from useAuth based on form type
      if (formType === 'login') {
        await login(trimmedUsername, trimmedPassword);
      } else {
        await register(trimmedUsername, trimmedPassword);
      }
    },
    [username, password, formType, login, register]
  );


  // Define function to toggle between login and register forms
  const toggleFormType = useCallback(() => {
    setFormType((prevFormType) =>
      prevFormType === 'login' ? 'register' : 'login'
    );
  }, []);


  return (
    <div className="flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {formType === 'login' ? 'Login' : 'Register'}
        </h2>
        <Input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={handleUsernameChange}
          label="Username"
          required
        />
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          label="Password"
          required
        />

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

        <Button
           type="submit"
           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
           disabled={isLoading}
          >
          {isLoading ? 'Loading...' : formType === 'login' ? 'Login' : 'Register'}
        </Button>

        <Button
          onClick={toggleFormType}
           className="mt-4 text-blue-500 hover:text-blue-700 font-bold text-sm"
        >
          {formType === 'login'
            ? 'Need to Register?'
            : 'Already have an account? Login'}
        </Button>
      </form>
    </div>
  );
});

// Define PropTypes for type checking and documentation purposes.
AuthForm.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  login: PropTypes.func,
  register: PropTypes.func,
};

export default AuthForm;
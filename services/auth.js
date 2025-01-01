import api from './api.js';

const login = async (username, password) => {
  try {
    if (!username || typeof username !== 'string' || username.trim() === '') {
      throw new Error('Username cannot be empty');
    }
    if (!password || typeof password !== 'string' || password.trim() === '') {
      throw new Error('Password cannot be empty');
    }

    const response = await api.post('/api/auth/login', { username, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    if (error.response) {
      throw new Error(
        error.response.data.message || 'Login failed with server error'
      );
    } else {
      throw new Error('Login failed: ' + error.message);
    }
  }
};

const register = async (username, password) => {
    try {
        if (!username || typeof username !== 'string' || username.trim() === '') {
            throw new Error('Username cannot be empty');
        }
        if (!password || typeof password !== 'string' || password.trim() === '') {
            throw new Error('Password cannot be empty');
        }

        const response = await api.post('/api/auth/register', { username, password });
        return response.data;
    } catch (error) {
        console.error('Registration error:', error);
        if (error.response) {
            throw new Error(
                error.response.data.message || 'Registration failed with server error'
            );
        } else {
            throw new Error('Registration failed: ' + error.message);
        }
    }
};


export { login, register };
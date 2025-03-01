import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/AuthForm.css';

const AuthForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username: e.target.username.value,
      password: e.target.password.value
    };

    try {
      const endpoint = isLogin ? 'login' : 'register';
      const response = await fetch(`http://localhost:3001/api/auth/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(isLogin ? 'Login failed' : 'Registration failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/recipes');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      {error && <div className="error-message">{error}</div>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            required 
          />
        </div>

        <button type="submit" className="submit-btn">
          {isLogin ? 'Login' : 'Register'}
        </button>

        <button 
          type="button" 
          className="toggle-btn"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
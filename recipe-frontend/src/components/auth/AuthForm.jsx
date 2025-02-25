import React from 'react';
import '../../styles/components/AuthForm.css';

const AuthForm = () => {
  return (
    <div className="auth-container">
      <form className="auth-form">
        <h2>Login/Register</h2>
        
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
          Login/Register
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
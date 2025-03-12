import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/components/AuthForm.css';

const AuthForm = ({ type = "login" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isAuthenticated } = useAuth();
  const [isLogin, setIsLogin] = useState(type === "login");
  
  // Set the form type based on the route
  useEffect(() => {
    setIsLogin(type === "login");
  }, [type]);

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Redirect if already logged in
    if (isAuthenticated) {
      const from = location.state?.from || '/recipes';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, location.state, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return false;
    }
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        // If register function is not available from context, implement direct API call
        if (typeof register !== 'function') {
          // Direct API call to backend registration endpoint
          try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: formData.email,
                password: formData.password,
              }),
            });
            
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Registration failed');
            }
            
            setMessage('Registration successful! Please log in with your credentials.');
            setTimeout(() => {
              navigate('/login');  // Redirect to login page after registration
            }, 2000);
          } catch (apiError) {
            console.error('Registration API error:', apiError);
            throw new Error(`Registration failed: ${apiError.message || 'Backend registration endpoint not available'}`);
          }
        } else {
          await register(formData.email, formData.password);
          setMessage('Registration successful! Please log in with your credentials.');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    // Also update the URL to reflect the current auth mode
    navigate(isLogin ? '/register' : '/login');
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Login' : 'Create an Account'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        )}
        
        <button 
          type="submit" 
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
        </button>
        
        <button 
          type="button"
          className="toggle-btn"
          onClick={toggleAuthMode}
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
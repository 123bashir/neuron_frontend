import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ModernPopup from '../components/ModernPopup';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        
        // Use AuthContext to set user data
        login(data.user);
        
        // Show success popup
        setPopup({
          isOpen: true,
          title: 'Welcome Back! 🚀',
          message: `Hello ${data.user.firstName}! You have successfully logged in. Redirecting to your dashboard...`,
          type: 'success'
        });
        
        // Redirect to dashboard after popup
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        // Handle login errors
        if (data.error) {
          if (data.error.includes('Invalid email or password')) {
            setErrors({ general: 'Invalid email or password. Please try again.' });
          } else {
            setErrors({ general: data.error });
          }
        } else {
          setErrors({ general: 'Login failed. Please try again.' });
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      setPopup({
        isOpen: true,
        title: 'Connection Error',
        message: 'Please check your internet connection and try again.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Add floating particles animation
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
      particle.style.animationDelay = Math.random() * 2 + 's';
      document.querySelector('.login-background').appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 5000);
    };

    const interval = setInterval(createParticle, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="stars">
          {[...Array(50)].map((_, i) => (
            <div key={i} className={`star star-${i + 1}`}></div>
          ))}
        </div>
        <div className="space-gradient"></div>
      </div>

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="logo">
              <img 
                src="/logo.png" 
                alt="SpaceHab Logo" 
                className="logo-icon"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="logo-icon-fallback" style={{display: 'none'}}>🚀</div>
              <span className="logo-text">Neuron</span>
            </div>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to continue building space habitats</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {errors.general && (
              <div className="error-message general-error">
                {errors.general}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <span className="label-icon">📧</span>
                Email Address
              </label>
              <div className="input-container">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="Enter your email"
                  required
                />
                <div className="input-glow"></div>
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <span className="label-icon">🔒</span>
                Password
              </label>
              <div className="input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
                <div className="input-glow"></div>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>

            <button 
              type="submit" 
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <div className="button-glow"></div>
                </>
              )}
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            <div className="social-login">
              <button type="button" className="social-button google">
                <span className="social-icon">🌐</span>
                Continue with Google
              </button>
              <button type="button" className="social-button github">
                <span className="social-icon">⚡</span>
                Continue with GitHub
              </button>
            </div>

            <div className="signup-link">
              <p>Don't have an account? <a href="/register">Sign up</a></p>
            </div>
          </form>
        </div>

        <div className="login-visual">
          <div className="space-station">
            <div className="station-core"></div>
            <div className="station-ring ring-1"></div>
            <div className="station-ring ring-2"></div>
            <div className="station-ring ring-3"></div>
            <div className="station-lights">
              <div className="light light-1"></div>
              <div className="light light-2"></div>
              <div className="light light-3"></div>
              <div className="light light-4"></div>
            </div>
          </div>
          <div className="floating-elements">
            <div className="element element-1">🛰️</div>
            <div className="element element-2">🌌</div>
            <div className="element element-3">⭐</div>
            <div className="element element-4">🚀</div>
          </div>
        </div>
      </div>

      {/* Modern Popup */}
      <ModernPopup
        isOpen={popup.isOpen}
        onClose={() => setPopup({ ...popup, isOpen: false })}
        title={popup.title}
        message={popup.message}
        type={popup.type}
        autoClose={popup.type === 'success'}
        autoCloseDelay={3000}
      />
    </div>
  );
};

export default Login;

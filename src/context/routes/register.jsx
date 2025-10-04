import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization: '',
    role: '',
    agreeTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization is required';
    }
    
    if (!formData.role) {
      newErrors.role = 'Please select your role';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Registration successful:', formData);
      // Handle successful registration here
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  useEffect(() => {
    // Add floating particles animation
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
      particle.style.animationDelay = Math.random() * 2 + 's';
      document.querySelector('.register-background').appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 5000);
    };

    const interval = setInterval(createParticle, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="register-page">
      <div className="register-background">
        <div className="stars">
          {[...Array(60)].map((_, i) => (
            <div key={i} className={`star star-${i + 1}`}></div>
          ))}
        </div>
        <div className="space-gradient"></div>
      </div>

      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <div className="logo">
              <img 
                src="/neuron.png" 
                alt="Neuron Logo" 
                className="logo-icon"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="logo-icon-fallback" style={{display: 'none'}}>🚀</div>
              <span className="logo-text">Neuron</span>
            </div>
            <h1 className="register-title">Join the Space Revolution</h1>
            <p className="register-subtitle">Create your account to start building space habitats</p>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  <span className="label-icon">👤</span>
                  First Name
                </label>
                <div className="input-container">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`form-input ${errors.firstName ? 'error' : ''}`}
                    placeholder="Enter your first name"
                    required
                  />
                  <div className="input-glow"></div>
                </div>
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  <span className="label-icon">👤</span>
                  Last Name
                </label>
                <div className="input-container">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`form-input ${errors.lastName ? 'error' : ''}`}
                    placeholder="Enter your last name"
                    required
                  />
                  <div className="input-glow"></div>
                </div>
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
            </div>

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

            <div className="form-row">
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
                    placeholder="Create a password"
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

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  <span className="label-icon">🔒</span>
                  Confirm Password
                </label>
                <div className="input-container">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                  <div className="input-glow"></div>
                </div>
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="organization" className="form-label">
                <span className="label-icon">🏢</span>
                Organization
              </label>
              <div className="input-container">
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className={`form-input ${errors.organization ? 'error' : ''}`}
                  placeholder="Your company or organization"
                  required
                />
                <div className="input-glow"></div>
              </div>
              {errors.organization && <span className="error-message">{errors.organization}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="role" className="form-label">
                <span className="label-icon">🎯</span>
                Role
              </label>
              <div className="input-container">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`form-input form-select ${errors.role ? 'error' : ''}`}
                  required
                >
                  <option value="">Select your role</option>
                  <option value="architect">Space Architect</option>
                  <option value="engineer">Space Engineer</option>
                  <option value="designer">Habitat Designer</option>
                  <option value="researcher">Space Researcher</option>
                  <option value="student">Student</option>
                  <option value="other">Other</option>
                </select>
                <div className="input-glow"></div>
              </div>
              {errors.role && <span className="error-message">{errors.role}</span>}
            </div>

            <div className="form-group">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                I agree to the <a href="#" className="terms-link">Terms of Service</a> and <a href="#" className="terms-link">Privacy Policy</a>
              </label>
              {errors.agreeTerms && <span className="error-message">{errors.agreeTerms}</span>}
            </div>

            <button 
              type="submit" 
              className={`register-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <div className="button-glow"></div>
                </>
              )}
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            <div className="social-register">
              <button type="button" className="social-button google">
                <span className="social-icon">🌐</span>
                Sign up with Google
              </button>
              <button type="button" className="social-button github">
                <span className="social-icon">⚡</span>
                Sign up with GitHub
              </button>
            </div>

            <div className="login-link">
              <p>Already have an account? <button type="button" className="login-redirect" onClick={handleLoginRedirect}>Sign in</button></p>
            </div>
          </form>
        </div>

        <div className="register-visual">
          <div className="space-habitat">
            <div className="habitat-core"></div>
            <div className="habitat-ring ring-1"></div>
            <div className="habitat-ring ring-2"></div>
            <div className="habitat-ring ring-3"></div>
            <div className="habitat-modules">
              <div className="module module-1"></div>
              <div className="module module-2"></div>
              <div className="module module-3"></div>
              <div className="module module-4"></div>
            </div>
            <div className="habitat-lights">
              <div className="light light-1"></div>
              <div className="light light-2"></div>
              <div className="light light-3"></div>
              <div className="light light-4"></div>
              <div className="light light-5"></div>
              <div className="light light-6"></div>
            </div>
          </div>
          <div className="floating-elements">
            <div className="element element-1">🛰️</div>
            <div className="element element-2">🌌</div>
            <div className="element element-3">⭐</div>
            <div className="element element-4">🚀</div>
            <div className="element element-5">🛸</div>
            <div className="element element-6">🌍</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

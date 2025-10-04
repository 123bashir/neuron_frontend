import React, { useState, useEffect } from 'react';
import './contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: '',
    agreeTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    if (!formData.inquiryType) {
      newErrors.inquiryType = 'Please select inquiry type';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
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
      console.log('Contact form submitted:', formData);
      setIsSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: '',
        agreeTerms: false
      });
    } catch (error) {
      console.error('Contact form failed:', error);
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
      document.querySelector('.contact-background').appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 5000);
    };

    const interval = setInterval(createParticle, 300);
    return () => clearInterval(interval);
  }, []);

  if (isSubmitted) {
    return (
      <div className="contact-page">
        <div className="contact-background">
          <div className="stars">
            {[...Array(80)].map((_, i) => (
              <div key={i} className={`star star-${i + 1}`}></div>
            ))}
          </div>
          <div className="space-gradient"></div>
        </div>

        <div className="success-container">
          <div className="success-card">
            <div className="success-icon">🚀</div>
            <h1 className="success-title">Message Sent Successfully!</h1>
            <p className="success-message">
              Thank you for reaching out! Our space habitat team will get back to you within 24 hours.
            </p>
            <button 
              className="success-button"
              onClick={() => setIsSubmitted(false)}
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <div className="contact-background">
        <div className="stars">
          {[...Array(80)].map((_, i) => (
            <div key={i} className={`star star-${i + 1}`}></div>
          ))}
        </div>
        <div className="space-gradient"></div>
      </div>

      <div className="contact-container">
        <div className="contact-header">
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
          <h1 className="contact-title">Contact Our Space Team</h1>
          <p className="contact-subtitle">
            Ready to build the future of space living? Get in touch with our habitat design experts.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-form-section">
            <div className="contact-card">
              <div className="form-header">
                <h2 className="form-title">Send us a Message</h2>
                <p className="form-subtitle">We'll respond within 24 hours</p>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      <span className="label-icon">👤</span>
                      Full Name
                    </label>
                    <div className="input-container">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`form-input ${errors.name ? 'error' : ''}`}
                        placeholder="Enter your full name"
                        required
                      />
                      <div className="input-glow"></div>
                    </div>
                    {errors.name && <span className="error-message">{errors.name}</span>}
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
                </div>

                <div className="form-group">
                  <label htmlFor="inquiryType" className="form-label">
                    <span className="label-icon">🎯</span>
                    Inquiry Type
                  </label>
                  <div className="input-container">
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className={`form-input form-select ${errors.inquiryType ? 'error' : ''}`}
                      required
                    >
                      <option value="">Select inquiry type</option>
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="media">Media & Press</option>
                      <option value="careers">Careers</option>
                      <option value="feedback">Feedback</option>
                    </select>
                    <div className="input-glow"></div>
                  </div>
                  {errors.inquiryType && <span className="error-message">{errors.inquiryType}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    <span className="label-icon">📝</span>
                    Subject
                  </label>
                  <div className="input-container">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`form-input ${errors.subject ? 'error' : ''}`}
                      placeholder="What's this about?"
                      required
                    />
                    <div className="input-glow"></div>
                  </div>
                  {errors.subject && <span className="error-message">{errors.subject}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    <span className="label-icon">💬</span>
                    Message
                  </label>
                  <div className="input-container">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className={`form-input form-textarea ${errors.message ? 'error' : ''}`}
                      placeholder="Tell us about your space habitat project..."
                      rows="6"
                      required
                    ></textarea>
                    <div className="input-glow"></div>
                  </div>
                  {errors.message && <span className="error-message">{errors.message}</span>}
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
                  className={`contact-button ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="spinner"></div>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <div className="button-glow"></div>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="contact-info-section">
            <div className="info-card">
              <h3 className="info-title">Get in Touch</h3>
              <p className="info-subtitle">Multiple ways to reach our space habitat team</p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">📧</div>
                  <div className="method-content">
                    <h4 className="method-title">Email</h4>
                    <p className="method-text">contact@neuron.space</p>
                    <p className="method-text">support@neuron.space</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">📞</div>
                  <div className="method-content">
                    <h4 className="method-title">Phone</h4>
                    <p className="method-text">+1 (555) 123-SPACE</p>
                    <p className="method-text">Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">📍</div>
                  <div className="method-content">
                    <h4 className="method-title">Office</h4>
                    <p className="method-text">Space Innovation Center</p>
                    <p className="method-text">123 Cosmos Avenue, Mars Colony</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">⏰</div>
                  <div className="method-content">
                    <h4 className="method-title">Response Time</h4>
                    <p className="method-text">General: 24 hours</p>
                    <p className="method-text">Technical: 12 hours</p>
                  </div>
                </div>
              </div>

              <div className="social-links">
                <h4 className="social-title">Follow Our Journey</h4>
                <div className="social-buttons">
                  <a href="#" className="social-link twitter">
                    <span className="social-icon">🐦</span>
                    Twitter
                  </a>
                  <a href="#" className="social-link linkedin">
                    <span className="social-icon">💼</span>
                    LinkedIn
                  </a>
                  <a href="#" className="social-link github">
                    <span className="social-icon">⚡</span>
                    GitHub
                  </a>
                  <a href="#" className="social-link youtube">
                    <span className="social-icon">📺</span>
                    YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-visual">
          <div className="communication-network">
            <div className="network-center"></div>
            <div className="network-node node-1"></div>
            <div className="network-node node-2"></div>
            <div className="network-node node-3"></div>
            <div className="network-node node-4"></div>
            <div className="network-node node-5"></div>
            <div className="network-node node-6"></div>
            <div className="network-connections">
              <div className="connection connection-1"></div>
              <div className="connection connection-2"></div>
              <div className="connection connection-3"></div>
              <div className="connection connection-4"></div>
              <div className="connection connection-5"></div>
              <div className="connection connection-6"></div>
            </div>
            <div className="network-pulse"></div>
          </div>
          <div className="floating-elements">
            <div className="element element-1">📡</div>
            <div className="element element-2">🌌</div>
            <div className="element element-3">⭐</div>
            <div className="element element-4">🚀</div>
            <div className="element element-5">🛸</div>
            <div className="element element-6">🌍</div>
            <div className="element element-7">💫</div>
            <div className="element element-8">🔭</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

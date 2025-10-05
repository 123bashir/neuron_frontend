import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';

const Landing = () => {
  const earthRef = useRef(null);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // removed video state — replaced by AI flow

  // Navigation functions
  const handleGetStarted = () => {
    navigate('/dashboard');
    setMobileMenuOpen(false);
  };

  const handleStartCreating = () => {
    navigate('/dashboard');
    setMobileMenuOpen(false);
  };

  const handleUseAI = () => {
    // go to AI prompt page
    navigate('/ai');
    setMobileMenuOpen(false);
  };

  // close menu on Escape
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  // close when clicking outside the menu content
  const onOverlayClick = (e) => {
    if (e.target === e.currentTarget) setMobileMenuOpen(false);
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <nav className="nav">
          <div className="nav-brand">
            <div className="logo">
              <img 
                src="/neuron.png" 
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
          </div>
          <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <a href="/features" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="/contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            {/* header CTA removed as requested */}
          </div>
          <button
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
        {/* Mobile menu overlay */}
        <div
          className={`mobile-menu-overlay ${mobileMenuOpen ? 'show' : ''}`}
          onClick={onOverlayClick}
          role="dialog"
          aria-modal="true"
        >
          <div className="mobile-menu-content" role="document">
            <button
              className="mobile-menu-close"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
            >
              ✕
            </button>
            <a href="/features" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="/contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            {/* mobile CTA removed to match header */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Design Your
              <span className="gradient-text"> Space Habitat</span>
            </h1>
            <p className="hero-subtitle">
              Create, visualize, and optimize living spaces for the future of humanity in space. 
              Build sustainable habitats with cutting-edge design tools.
            </p>
            <div className="hero-buttons">
              <button className="primary-button" onClick={handleStartCreating}>
                <span>Start Creating</span>
                <div className="button-glow"></div>
              </button>
              <button className="secondary-button" onClick={handleUseAI}>
                <span>Use AI</span>
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="earth-scene" aria-hidden="true">
              <div className="earth" ref={earthRef}>
                {/* replaced with public/bb.jpg */}
                <img src="/bb.jpg" alt="Earth" className="earth-img" />
                <img src="/assets/earth-clouds.png" alt="" className="earth-clouds" />
                <div className="earth-glow" />
              </div>
              <div className="orbiting-satellites" aria-hidden="true">
                <div className="satellite">🛰️</div>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* "Use AI" flow handled on /ai route */}

      {/* Features Section */}
      <section id="features" className="features section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Powerful Design Tools</h2>
            <p className="section-subtitle">
              Everything you need to create the perfect space habitat
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <div className="icon-3d">🏗️</div>
              </div>
              <h3 className="feature-title">3D Habitat Builder</h3>
              <p className="feature-description">
                Design complex space habitats with our intuitive 3D modeling tools. 
                Drag, drop, and customize every element of your living space.
              </p>
              <div className="feature-highlight">
                <span className="highlight-text">Real-time rendering</span>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <div className="icon-3d">🌱</div>
              </div>
              <h3 className="feature-title">Life Support Systems</h3>
              <p className="feature-description">
                Integrate oxygen generation, water recycling, and food production 
                systems into your habitat design with scientific accuracy.
              </p>
              <div className="feature-highlight">
                <span className="highlight-text">NASA-approved systems</span>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <div className="icon-3d">⚡</div>
              </div>
              <h3 className="feature-title">Energy Optimization</h3>
              <p className="feature-description">
                Calculate power requirements, solar panel placement, and energy 
                efficiency for optimal resource management in space.
              </p>
              <div className="feature-highlight">
                <span className="highlight-text">AI-powered optimization</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="about-title">The Future of Space Living</h2>
              <p className="about-description">
                As humanity prepares for long-term space exploration and colonization, 
                designing efficient, sustainable habitats becomes crucial. Our platform 
                combines cutting-edge technology with space engineering principles to 
                help you create the perfect living environment beyond Earth.
              </p>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">10K+</div>
                  <div className="stat-label">Designs Created</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Space Agencies</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">99.9%</div>
                  <div className="stat-label">Accuracy Rate</div>
                </div>
              </div>
            </div>
            <div className="about-visual">
              <div className="habitat-preview">
                <div className="habitat-structure">
                  <div className="habitat-module module-1"></div>
                  <div className="habitat-module module-2"></div>
                  <div className="habitat-module module-3"></div>
                  <div className="habitat-connector"></div>
                </div>
                <div className="habitat-lights">
                  <div className="light light-1"></div>
                  <div className="light light-2"></div>
                  <div className="light light-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-brand">
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
                  <span className="logo-text">SpaceHab</span>
                </div>
                <p className="footer-description">
                  Building the future of space living, one habitat at a time.
                </p>
              </div>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Product</h4>
              <ul className="footer-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#templates">Templates</a></li>
                <li><a href="#api">API</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Company</h4>
              <ul className="footer-links">
                <li><a href="#about">About</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#press">Press</a></li>
                <li><a href="#blog">Blog</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Support</h4>
              <ul className="footer-links">
                <li><a href="#help">Help Center</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#community">Community</a></li>
                <li><a href="#status">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copyright">
              <p>&copy; 2024 SpaceHab. All rights reserved.</p>
            </div>
            <div className="footer-social">
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

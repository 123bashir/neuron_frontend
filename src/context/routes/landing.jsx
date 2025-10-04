import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';

const Landing = () => {
  const earthRef = useRef(null);
  const navigate = useNavigate();

  // Navigation functions
  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleStartCreating = () => {
    navigate('/register');
  };

  const handleWatchDemo = () => {
    // You can add demo functionality here
    console.log('Watch Demo clicked');
  };

  useEffect(() => {
    // Add scroll animations
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

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

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
          <div className="nav-links">
            <a href="/features" className="nav-link">Features</a>
            <a href="/about" className="nav-link">About</a>
            <a href="/contact" className="nav-link">Contact</a>
            <button className="cta-button" onClick={handleGetStarted}>Login</button>
          </div>
          <div className="mobile-menu-toggle">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
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
              <button className="secondary-button" onClick={handleWatchDemo}>
                <span>Watch Demo</span>
                <div className="play-icon">▶</div>
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="kano-map-container">
              <div className="kano-map-revolving" ref={earthRef}>
                <div className="kano-map-globe">
                  <div className="kano-surface"></div>
                  <div className="kano-districts">
                    <div className="district dala">Dala</div>
                    <div className="district fagge">Fagge</div>
                    <div className="district gwale">Gwale</div>
                    <div className="district kano-municipal">Kano Municipal</div>
                    <div className="district nassarawa">Nassarawa</div>
                    <div className="district taruni">Taruni</div>
                    <div className="district unguwa">Unguwa</div>
                    <div className="district kumbotso">Kumbotso</div>
                  </div>
                  <div className="kano-landmarks">
                    <div className="landmark airport">✈️</div>
                    <div className="landmark palace">🏰</div>
                    <div className="landmark market">🏪</div>
                    <div className="landmark university">🎓</div>
                    <div className="landmark stadium">🏟️</div>
                    <div className="landmark hospital">🏥</div>
                  </div>
                  <div className="kano-roads">
                    <div className="road road-1"></div>
                    <div className="road road-2"></div>
                    <div className="road road-3"></div>
                    <div className="road road-4"></div>
                    <div className="road road-5"></div>
                  </div>
                  <div className="kano-center">
                    <div className="center-point"></div>
                  </div>
                </div>
                <div className="kano-atmosphere"></div>
                <div className="kano-glow"></div>
              </div>
              <div className="orbit-ring orbit-1">
                <div className="satellite satellite-1">🛰️</div>
              </div>
              <div className="orbit-ring orbit-2">
                <div className="satellite satellite-2">🛰️</div>
              </div>
              <div className="orbit-ring orbit-3">
                <div className="satellite satellite-3">🛰️</div>
              </div>
              <div className="stars">
                {[...Array(100)].map((_, i) => (
                  <div key={i} className={`star star-${i + 1}`}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

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

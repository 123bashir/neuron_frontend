import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Add floating particles animation
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
      particle.style.animationDelay = Math.random() * 2 + 's';
      document.querySelector('.notfound-background').appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 5000);
    };

    const interval = setInterval(createParticle, 300);
    return () => clearInterval(interval);
  }, []);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="notfound-page">
      <div className="notfound-background">
        <div className="stars">
          {[...Array(80)].map((_, i) => (
            <div key={i} className={`star star-${i + 1}`}></div>
          ))}
        </div>
        <div className="space-gradient"></div>
      </div>

      <div className="notfound-container">
        <div className="notfound-content">
          <div className="notfound-visual">
            <div className="astronaut">
              <div className="astronaut-body"></div>
              <div className="astronaut-helmet"></div>
              <div className="astronaut-antenna"></div>
              <div className="astronaut-flag">
                <div className="flag-pole"></div>
                <div className="flag-cloth">404</div>
              </div>
            </div>
            <div className="planet">
              <div className="planet-surface"></div>
              <div className="planet-craters">
                <div className="crater crater-1"></div>
                <div className="crater crater-2"></div>
                <div className="crater crater-3"></div>
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

          <div className="notfound-text">
            <h1 className="notfound-title">404</h1>
            <h2 className="notfound-subtitle">Lost in Space</h2>
            <p className="notfound-description">
              Oops! It looks like you've drifted into uncharted territory. 
              The page you're looking for seems to have been lost in the vastness of cyberspace.
            </p>
            <p className="notfound-suggestion">
              Don't worry, even the best astronauts get lost sometimes. 
              Let's get you back on course!
            </p>

            <div className="notfound-actions">
              <button className="notfound-button primary" onClick={handleGoHome}>
                <span className="button-icon">🏠</span>
                <span>Return to Earth</span>
                <div className="button-glow"></div>
              </button>
              <button className="notfound-button secondary" onClick={handleGoBack}>
                <span className="button-icon">⬅️</span>
                <span>Go Back</span>
                <div className="button-glow"></div>
              </button>
            </div>

            <div className="notfound-help">
              <p>Need help navigating?</p>
              <div className="help-links">
                <a href="/" className="help-link">Home</a>
                <a href="/login" className="help-link">Login</a>
                <a href="/register" className="help-link">Register</a>
                <a href="/dashboard" className="help-link">Dashboard</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

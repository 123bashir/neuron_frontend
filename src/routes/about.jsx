import React, { useEffect } from 'react';
import './about.css';

const About = () => {
  useEffect(() => {
    // Add floating particles animation
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
      particle.style.animationDelay = Math.random() * 2 + 's';
      document.querySelector('.about-background').appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 5000);
    };

    const interval = setInterval(createParticle, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-page">
      <div className="about-background">
        <div className="stars">
          {[...Array(100)].map((_, i) => (
            <div key={i} className={`star star-${i + 1}`}></div>
          ))}
        </div>
        <div className="space-gradient"></div>
      </div>

      <div className="about-container">
        {/* Header */}
        <div className="about-header">
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
          <h1 className="about-title">About Our Space Mission</h1>
          <p className="about-subtitle">
            Pioneering the future of space living through innovative habitat design and cutting-edge technology.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mission-section">
          <div className="mission-content">
            <div className="mission-text">
              <h2 className="section-title">Our Mission</h2>
              <p className="mission-description">
                At Neuron, we're dedicated to revolutionizing space habitation by creating sustainable, 
                efficient, and livable environments for humanity's future beyond Earth. Our advanced 
                design tools and AI-powered systems enable architects, engineers, and visionaries to 
                build the space habitats of tomorrow.
              </p>
              <div className="mission-stats">
                <div className="stat-item">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Space Agencies</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">10K+</div>
                  <div className="stat-label">Habitat Designs</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">99.9%</div>
                  <div className="stat-label">Accuracy Rate</div>
                </div>
              </div>
            </div>
            <div className="mission-visual">
              <div className="space-station">
                <div className="station-core"></div>
                <div className="station-ring ring-1"></div>
                <div className="station-ring ring-2"></div>
                <div className="station-ring ring-3"></div>
                <div className="station-modules">
                  <div className="module module-1"></div>
                  <div className="module module-2"></div>
                  <div className="module module-3"></div>
                  <div className="module module-4"></div>
                  <div className="module module-5"></div>
                  <div className="module module-6"></div>
                </div>
                <div className="station-lights">
                  <div className="light light-1"></div>
                  <div className="light light-2"></div>
                  <div className="light light-3"></div>
                  <div className="light light-4"></div>
                  <div className="light light-5"></div>
                  <div className="light light-6"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="vision-section">
          <div className="vision-content">
            <div className="vision-visual">
              <div className="galaxy">
                <div className="galaxy-core"></div>
                <div className="galaxy-arm arm-1"></div>
                <div className="galaxy-arm arm-2"></div>
                <div className="galaxy-arm arm-3"></div>
                <div className="galaxy-arm arm-4"></div>
                <div className="galaxy-stars">
                  <div className="galaxy-star star-1"></div>
                  <div className="galaxy-star star-2"></div>
                  <div className="galaxy-star star-3"></div>
                  <div className="galaxy-star star-4"></div>
                  <div className="galaxy-star star-5"></div>
                  <div className="galaxy-star star-6"></div>
                </div>
              </div>
            </div>
            <div className="vision-text">
              <h2 className="section-title">Our Vision</h2>
              <p className="vision-description">
                We envision a future where space habitats are not just functional structures, 
                but thriving communities that support human life, creativity, and exploration. 
                Our platform empowers designers to create habitats that are sustainable, 
                beautiful, and perfectly suited for the challenges of space living.
              </p>
              <div className="vision-features">
                <div className="feature-item">
                  <div className="feature-icon">🌱</div>
                  <div className="feature-content">
                    <h3 className="feature-title">Sustainable Living</h3>
                    <p className="feature-description">Self-sufficient ecosystems for long-term space habitation</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🎨</div>
                  <div className="feature-content">
                    <h3 className="feature-title">Beautiful Design</h3>
                    <p className="feature-description">Aesthetically pleasing spaces that inspire and comfort</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">⚡</div>
                  <div className="feature-content">
                    <h3 className="feature-title">Advanced Technology</h3>
                    <p className="feature-description">Cutting-edge systems for optimal space living</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <div className="team-header">
            <h2 className="section-title">Meet Our Space Team</h2>
            <p className="team-subtitle">
              The brilliant minds behind the future of space habitation
            </p>
          </div>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">
                <div className="avatar-icon">👨‍🚀</div>
                <div className="avatar-glow"></div>
              </div>
              <h3 className="member-name">Dr. Sarah Chen</h3>
              <p className="member-role">Chief Space Architect</p>
              <p className="member-bio">
                Former NASA engineer with 15+ years designing habitats for Mars missions. 
                Expert in life support systems and sustainable space living.
              </p>
              <div className="member-social">
                <a href="#" className="social-link">LinkedIn</a>
                <a href="#" className="social-link">Twitter</a>
              </div>
            </div>

            <div className="team-member">
              <div className="member-avatar">
                <div className="avatar-icon">👩‍🔬</div>
                <div className="avatar-glow"></div>
              </div>
              <h3 className="member-name">Marcus Rodriguez</h3>
              <p className="member-role">Lead AI Engineer</p>
              <p className="member-bio">
                AI specialist developing intelligent systems for habitat optimization. 
                PhD in Machine Learning from MIT with focus on space applications.
              </p>
              <div className="member-social">
                <a href="#" className="social-link">GitHub</a>
                <a href="#" className="social-link">LinkedIn</a>
              </div>
            </div>

            <div className="team-member">
              <div className="member-avatar">
                <div className="avatar-icon">👨‍💻</div>
                <div className="avatar-glow"></div>
              </div>
              <h3 className="member-name">Elena Volkov</h3>
              <p className="member-role">UX Design Director</p>
              <p className="member-bio">
                Creating intuitive interfaces for complex space habitat design. 
                Former SpaceX designer with expertise in human-centered design for space.
              </p>
              <div className="member-social">
                <a href="#" className="social-link">Dribbble</a>
                <a href="#" className="social-link">Twitter</a>
              </div>
            </div>

            <div className="team-member">
              <div className="member-avatar">
                <div className="avatar-icon">👩‍🚀</div>
                <div className="avatar-glow"></div>
              </div>
              <h3 className="member-name">Dr. James Kim</h3>
              <p className="member-role">Chief Technology Officer</p>
              <p className="member-bio">
                Leading our technical vision with 20+ years in aerospace engineering. 
                Former Blue Origin engineer specializing in propulsion and life support.
              </p>
              <div className="member-social">
                <a href="#" className="social-link">LinkedIn</a>
                <a href="#" className="social-link">GitHub</a>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <div className="values-header">
            <h2 className="section-title">Our Core Values</h2>
            <p className="values-subtitle">
              The principles that guide our mission to revolutionize space living
            </p>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🌍</div>
              <h3 className="value-title">Sustainability</h3>
              <p className="value-description">
                We design habitats that minimize environmental impact and maximize 
                resource efficiency for long-term space habitation.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">🔬</div>
              <h3 className="value-title">Innovation</h3>
              <p className="value-description">
                We push the boundaries of what's possible, constantly exploring 
                new technologies and design approaches for space living.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3 className="value-title">Collaboration</h3>
              <p className="value-description">
                We believe the future of space is built together, fostering 
                partnerships with agencies, researchers, and visionaries worldwide.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3 className="value-title">Excellence</h3>
              <p className="value-description">
                We maintain the highest standards in everything we do, ensuring 
                our habitats meet the rigorous demands of space environments.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="timeline-section">
          <div className="timeline-header">
            <h2 className="section-title">Our Journey</h2>
            <p className="timeline-subtitle">
              Key milestones in our mission to revolutionize space habitation
            </p>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-year">2020</div>
                <h3 className="timeline-title">Neuron Founded</h3>
                <p className="timeline-description">
                  Started with a vision to make space habitation accessible to everyone, 
                  beginning with our first prototype design tools.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-year">2021</div>
                <h3 className="timeline-title">First Space Agency Partnership</h3>
                <p className="timeline-description">
                  Collaborated with NASA on habitat design for the Artemis program, 
                  marking our first major space agency partnership.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-year">2022</div>
                <h3 className="timeline-title">AI Integration</h3>
                <p className="timeline-description">
                  Launched our AI-powered design assistant, revolutionizing how 
                  architects approach space habitat design and optimization.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-year">2023</div>
                <h3 className="timeline-title">Global Expansion</h3>
                <p className="timeline-description">
                  Expanded partnerships with ESA, JAXA, and private space companies, 
                  establishing Neuron as a global leader in space habitation design.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-year">2024</div>
                <h3 className="timeline-title">Next Generation Platform</h3>
                <p className="timeline-description">
                  Launching our most advanced platform yet, featuring real-time 
                  collaboration, VR design tools, and predictive habitat modeling.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Build the Future?</h2>
            <p className="cta-description">
              Join thousands of architects, engineers, and visionaries who are already 
              designing the space habitats of tomorrow.
            </p>
            <div className="cta-buttons">
              <button className="cta-button primary">
                <span>Start Creating</span>
                <div className="button-glow"></div>
              </button>
              <button className="cta-button secondary">
                <span>Learn More</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;

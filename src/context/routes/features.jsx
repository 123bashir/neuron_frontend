import React, { useEffect, useState } from 'react';
import './features.css';

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Add floating particles animation
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
      particle.style.animationDelay = Math.random() * 2 + 's';
      document.querySelector('.features-background').appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 5000);
    };

    const interval = setInterval(createParticle, 300);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      id: 'ai-design',
      title: 'AI-Powered Design Assistant',
      description: 'Our advanced AI analyzes your requirements and suggests optimal space habitat layouts, ensuring maximum efficiency and livability.',
      icon: '🤖',
      color: '#00d4ff',
      details: [
        'Intelligent layout optimization',
        'Real-time design suggestions',
        'Energy efficiency calculations',
        'Life support system integration',
        'Automated compliance checking'
      ],
      demo: 'ai-demo'
    },
    {
      id: '2d-3d-modeling',
      title: '2D & 3D Modeling',
      description: 'Switch seamlessly between 2D planning and immersive 3D visualization to design habitats from every angle.',
      icon: '🎲',
      color: '#7c3aed',
      details: [
        'Real-time 2D to 3D conversion',
        'Immersive VR compatibility',
        'Precise measurement tools',
        'Multi-angle visualization',
        'Export to CAD formats'
      ],
      demo: 'modeling-demo'
    },
    {
      id: 'collaboration',
      title: 'Real-Time Collaboration',
      description: 'Work together with your team in real-time, sharing designs, commenting, and iterating on space habitat concepts.',
      icon: '👥',
      color: '#ff6b35',
      details: [
        'Live editing sessions',
        'Version control system',
        'Comment and annotation tools',
        'Team permission management',
        'Change tracking and history'
      ],
      demo: 'collaboration-demo'
    },
    {
      id: 'simulation',
      title: 'Advanced Simulation',
      description: 'Test your habitat designs with realistic physics simulations, environmental conditions, and emergency scenarios.',
      icon: '⚡',
      color: '#f59e0b',
      details: [
        'Physics-based simulations',
        'Environmental stress testing',
        'Emergency scenario modeling',
        'Performance optimization',
        'Safety compliance validation'
      ],
      demo: 'simulation-demo'
    },
    {
      id: 'resource-management',
      title: 'Resource Management',
      description: 'Optimize life support systems, power distribution, and resource allocation for sustainable space living.',
      icon: '🌱',
      color: '#10b981',
      details: [
        'Life support optimization',
        'Power grid management',
        'Waste recycling systems',
        'Water purification networks',
        'Oxygen generation planning'
      ],
      demo: 'resource-demo'
    },
    {
      id: 'export-integration',
      title: 'Export & Integration',
      description: 'Export your designs to industry-standard formats and integrate with existing space agency workflows.',
      icon: '📤',
      color: '#8b5cf6',
      details: [
        'CAD file export (DWG, DXF)',
        '3D model formats (OBJ, STL)',
        'API integration capabilities',
        'Space agency compliance',
        'Documentation generation'
      ],
      demo: 'export-demo'
    }
  ];

  const handleFeatureClick = (index) => {
    setActiveFeature(index);
  };

  return (
    <div className="features-page">
      <div className="features-background">
        <div className="stars">
          {[...Array(80)].map((_, i) => (
            <div key={i} className={`star star-${i + 1}`}></div>
          ))}
        </div>
        <div className="space-gradient"></div>
      </div>

      <div className="features-container">
        {/* Header */}
        <div className="features-header">
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
          <h1 className="features-title">Powerful Features for Space Habitat Design</h1>
          <p className="features-subtitle">
            Discover the advanced tools and capabilities that make Neuron the leading platform 
            for designing sustainable and efficient space habitats.
          </p>
        </div>

        {/* Feature Navigation */}
        <div className="feature-navigation">
          {features.map((feature, index) => (
            <button
              key={feature.id}
              className={`nav-item ${activeFeature === index ? 'active' : ''}`}
              onClick={() => handleFeatureClick(index)}
              style={{ '--feature-color': feature.color }}
            >
              <span className="nav-icon">{feature.icon}</span>
              <span className="nav-title">{feature.title}</span>
            </button>
          ))}
        </div>

        {/* Active Feature Display */}
        <div className="feature-showcase">
          <div className={`feature-content ${isVisible ? 'visible' : ''}`}>
            <div className="feature-main">
              <div className="feature-info">
                <div className="feature-header">
                  <div 
                    className="feature-icon-large"
                    style={{ backgroundColor: features[activeFeature].color }}
                  >
                    {features[activeFeature].icon}
                  </div>
                  <div className="feature-text">
                    <h2 className="feature-title-main">{features[activeFeature].title}</h2>
                    <p className="feature-description-main">{features[activeFeature].description}</p>
                  </div>
                </div>

                <div className="feature-details">
                  <h3 className="details-title">Key Capabilities:</h3>
                  <ul className="details-list">
                    {features[activeFeature].details.map((detail, index) => (
                      <li key={index} className="detail-item">
                        <span className="detail-icon">✓</span>
                        <span className="detail-text">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="feature-demo">
                <div className={`demo-container ${features[activeFeature].demo}`}>
                  {/* AI Design Demo */}
                  {features[activeFeature].demo === 'ai-demo' && (
                    <div className="ai-demo">
                      <div className="ai-brain">
                        <div className="brain-core"></div>
                        <div className="brain-ring ring-1"></div>
                        <div className="brain-ring ring-2"></div>
                        <div className="brain-ring ring-3"></div>
                        <div className="neural-nodes">
                          <div className="node node-1"></div>
                          <div className="node node-2"></div>
                          <div className="node node-3"></div>
                          <div className="node node-4"></div>
                          <div className="node node-5"></div>
                          <div className="node node-6"></div>
                        </div>
                        <div className="data-streams">
                          <div className="stream stream-1"></div>
                          <div className="stream stream-2"></div>
                          <div className="stream stream-3"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 2D/3D Modeling Demo */}
                  {features[activeFeature].demo === 'modeling-demo' && (
                    <div className="modeling-demo">
                      <div className="model-container">
                        <div className="model-2d">
                          <div className="grid-lines"></div>
                          <div className="habitat-outline"></div>
                          <div className="modules-2d">
                            <div className="module-2d module-1"></div>
                            <div className="module-2d module-2"></div>
                            <div className="module-2d module-3"></div>
                            <div className="module-2d module-4"></div>
                          </div>
                        </div>
                        <div className="model-3d">
                          <div className="habitat-3d">
                            <div className="habitat-core"></div>
                            <div className="habitat-ring"></div>
                            <div className="habitat-modules">
                              <div className="module-3d mod-1"></div>
                              <div className="module-3d mod-2"></div>
                              <div className="module-3d mod-3"></div>
                              <div className="module-3d mod-4"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Collaboration Demo */}
                  {features[activeFeature].demo === 'collaboration-demo' && (
                    <div className="collaboration-demo">
                      <div className="collab-network">
                        <div className="central-hub"></div>
                        <div className="user-nodes">
                          <div className="user-node user-1">
                            <div className="user-avatar">👨‍🚀</div>
                            <div className="user-name">Alex</div>
                          </div>
                          <div className="user-node user-2">
                            <div className="user-avatar">👩‍🔬</div>
                            <div className="user-name">Sarah</div>
                          </div>
                          <div className="user-node user-3">
                            <div className="user-avatar">👨‍💻</div>
                            <div className="user-name">Mike</div>
                          </div>
                          <div className="user-node user-4">
                            <div className="user-avatar">👩‍🚀</div>
                            <div className="user-name">Elena</div>
                          </div>
                        </div>
                        <div className="connection-lines">
                          <div className="line line-1"></div>
                          <div className="line line-2"></div>
                          <div className="line line-3"></div>
                          <div className="line line-4"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Simulation Demo */}
                  {features[activeFeature].demo === 'simulation-demo' && (
                    <div className="simulation-demo">
                      <div className="sim-container">
                        <div className="habitat-model">
                          <div className="habitat-structure"></div>
                          <div className="stress-points">
                            <div className="stress-point point-1"></div>
                            <div className="stress-point point-2"></div>
                            <div className="stress-point point-3"></div>
                          </div>
                        </div>
                        <div className="simulation-data">
                          <div className="data-bar bar-1"></div>
                          <div className="data-bar bar-2"></div>
                          <div className="data-bar bar-3"></div>
                          <div className="data-bar bar-4"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Resource Management Demo */}
                  {features[activeFeature].demo === 'resource-demo' && (
                    <div className="resource-demo">
                      <div className="resource-network">
                        <div className="resource-hub"></div>
                        <div className="resource-nodes">
                          <div className="resource-node power">
                            <div className="node-icon">⚡</div>
                            <div className="node-label">Power</div>
                          </div>
                          <div className="resource-node water">
                            <div className="node-icon">💧</div>
                            <div className="node-label">Water</div>
                          </div>
                          <div className="resource-node oxygen">
                            <div className="node-icon">💨</div>
                            <div className="node-label">Oxygen</div>
                          </div>
                          <div className="resource-node waste">
                            <div className="node-icon">♻️</div>
                            <div className="node-label">Waste</div>
                          </div>
                        </div>
                        <div className="resource-flows">
                          <div className="flow flow-1"></div>
                          <div className="flow flow-2"></div>
                          <div className="flow flow-3"></div>
                          <div className="flow flow-4"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Export Demo */}
                  {features[activeFeature].demo === 'export-demo' && (
                    <div className="export-demo">
                      <div className="export-container">
                        <div className="design-preview"></div>
                        <div className="export-formats">
                          <div className="format-item">DWG</div>
                          <div className="format-item">DXF</div>
                          <div className="format-item">OBJ</div>
                          <div className="format-item">STL</div>
                        </div>
                        <div className="export-arrow">→</div>
                        <div className="export-result"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="features-grid">
          <h2 className="grid-title">All Features at a Glance</h2>
          <div className="grid-container">
            {features.map((feature, index) => (
              <div key={feature.id} className="feature-card">
                <div 
                  className="card-icon"
                  style={{ backgroundColor: feature.color }}
                >
                  {feature.icon}
                </div>
                <h3 className="card-title">{feature.title}</h3>
                <p className="card-description">{feature.description}</p>
                <div className="card-details">
                  {feature.details.slice(0, 3).map((detail, idx) => (
                    <div key={idx} className="card-detail">
                      <span className="detail-bullet">•</span>
                      <span className="detail-text">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="features-cta">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Experience These Features?</h2>
            <p className="cta-description">
              Start designing your space habitat today with Neuron's powerful tools and intuitive interface.
            </p>
            <div className="cta-buttons">
              <button className="cta-button primary">
                <span>Start Creating</span>
                <div className="button-glow"></div>
              </button>
              <button className="cta-button secondary">
                <span>Watch Demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;

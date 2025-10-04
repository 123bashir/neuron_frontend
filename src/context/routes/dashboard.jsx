import React, { useState, useEffect, useRef } from 'react';
import './dashboard.css';

const Dashboard = () => {
  const [viewMode, setViewMode] = useState('2d'); // '2d' or '3d'
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [partsCount, setPartsCount] = useState(0);
  const [canvasElements, setCanvasElements] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Real-world space habitat design tools
  const designTools = {
    '2d': {
      'Habitat Modules': [
        { 
          id: 'crew-quarter', 
          name: 'Crew Quarters', 
          icon: '🛏️', 
          description: 'Sleeping and personal space',
          size: { width: 80, height: 60 },
          capacity: 4,
          powerConsumption: 2.5,
          lifeSupport: true,
          category: 'living'
        },
        { 
          id: 'laboratory', 
          name: 'Research Lab', 
          icon: '🔬', 
          description: 'Scientific research facility',
          size: { width: 100, height: 80 },
          capacity: 6,
          powerConsumption: 15,
          lifeSupport: true,
          category: 'research'
        },
        { 
          id: 'storage-bay', 
          name: 'Storage Bay', 
          icon: '📦', 
          description: 'Equipment and supplies storage',
          size: { width: 120, height: 80 },
          capacity: 0,
          powerConsumption: 1,
          lifeSupport: false,
          category: 'storage'
        },
        { 
          id: 'hydroponics', 
          name: 'Hydroponics', 
          icon: '🌱', 
          description: 'Food production facility',
          size: { width: 150, height: 100 },
          capacity: 2,
          powerConsumption: 8,
          lifeSupport: true,
          category: 'life-support'
        },
        { 
          id: 'command-center', 
          name: 'Command Center', 
          icon: '🎛️', 
          description: 'Mission control and monitoring',
          size: { width: 100, height: 100 },
          capacity: 8,
          powerConsumption: 12,
          lifeSupport: true,
          category: 'control'
        },
        { 
          id: 'docking-port', 
          name: 'Docking Port', 
          icon: '🚀', 
          description: 'Spacecraft docking facility',
          size: { width: 80, height: 120 },
          capacity: 0,
          powerConsumption: 5,
          lifeSupport: false,
          category: 'transport'
        }
      ],
      'Life Support Systems': [
        { 
          id: 'oxygen-generator', 
          name: 'O2 Generator', 
          icon: '💨', 
          description: 'Oxygen production system',
          size: { width: 60, height: 80 },
          capacity: 0,
          powerConsumption: 10,
          lifeSupport: false,
          category: 'life-support'
        },
        { 
          id: 'water-recycler', 
          name: 'Water Recycler', 
          icon: '💧', 
          description: 'Water purification system',
          size: { width: 70, height: 60 },
          capacity: 0,
          powerConsumption: 6,
          lifeSupport: false,
          category: 'life-support'
        },
        { 
          id: 'waste-processor', 
          name: 'Waste Processor', 
          icon: '♻️', 
          description: 'Waste management system',
          size: { width: 60, height: 70 },
          capacity: 0,
          powerConsumption: 4,
          lifeSupport: false,
          category: 'life-support'
        },
        { 
          id: 'co2-scrubber', 
          name: 'CO2 Scrubber', 
          icon: '🌿', 
          description: 'Carbon dioxide removal',
          size: { width: 50, height: 60 },
          capacity: 0,
          powerConsumption: 3,
          lifeSupport: false,
          category: 'life-support'
        },
        { 
          id: 'air-circulation', 
          name: 'Air Circulation', 
          icon: '🌪️', 
          description: 'Air filtration and circulation',
          size: { width: 40, height: 50 },
          capacity: 0,
          powerConsumption: 2,
          lifeSupport: false,
          category: 'life-support'
        }
      ],
      'Power Systems': [
        { 
          id: 'solar-array', 
          name: 'Solar Array', 
          icon: '☀️', 
          description: 'Solar panel array',
          size: { width: 200, height: 100 },
          capacity: 0,
          powerConsumption: -50,
          lifeSupport: false,
          category: 'power'
        },
        { 
          id: 'battery-bank', 
          name: 'Battery Bank', 
          icon: '🔋', 
          description: 'Energy storage system',
          size: { width: 80, height: 60 },
          capacity: 0,
          powerConsumption: 0,
          lifeSupport: false,
          category: 'power'
        },
        { 
          id: 'nuclear-reactor', 
          name: 'Nuclear Reactor', 
          icon: '⚛️', 
          description: 'Nuclear power generation',
          size: { width: 100, height: 100 },
          capacity: 0,
          powerConsumption: -100,
          lifeSupport: false,
          category: 'power'
        },
        { 
          id: 'fuel-cell', 
          name: 'Fuel Cell', 
          icon: '⚡', 
          description: 'Hydrogen fuel cell power',
          size: { width: 60, height: 80 },
          capacity: 0,
          powerConsumption: -25,
          lifeSupport: false,
          category: 'power'
        },
        { 
          id: 'power-distribution', 
          name: 'Power Grid', 
          icon: '🔌', 
          description: 'Power distribution network',
          size: { width: 40, height: 40 },
          capacity: 0,
          powerConsumption: 0,
          lifeSupport: false,
          category: 'power'
        }
      ],
      'Connections': [
        { 
          id: 'corridor', 
          name: 'Corridor', 
          icon: '🚶', 
          description: 'Main passageway',
          size: { width: 40, height: 20 },
          capacity: 0,
          powerConsumption: 0.5,
          lifeSupport: true,
          category: 'connection'
        },
        { 
          id: 'airlock', 
          name: 'Airlock', 
          icon: '🚪', 
          description: 'Pressurized entry/exit',
          size: { width: 60, height: 40 },
          capacity: 0,
          powerConsumption: 2,
          lifeSupport: false,
          category: 'connection'
        },
        { 
          id: 'tunnel', 
          name: 'Service Tunnel', 
          icon: '🕳️', 
          description: 'Maintenance access tunnel',
          size: { width: 30, height: 30 },
          capacity: 0,
          powerConsumption: 0.2,
          lifeSupport: false,
          category: 'connection'
        },
        { 
          id: 'bridge', 
          name: 'Connecting Bridge', 
          icon: '🌉', 
          description: 'Inter-module connection',
          size: { width: 50, height: 30 },
          capacity: 0,
          powerConsumption: 1,
          lifeSupport: true,
          category: 'connection'
        },
        { 
          id: 'elevator', 
          name: 'Elevator Shaft', 
          icon: '🛗', 
          description: 'Vertical transport system',
          size: { width: 40, height: 80 },
          capacity: 0,
          powerConsumption: 3,
          lifeSupport: false,
          category: 'connection'
        }
      ],
      'Utilities': [
        { 
          id: 'comm-dish', 
          name: 'Comm Dish', 
          icon: '📡', 
          description: 'Communication antenna',
          size: { width: 60, height: 60 },
          capacity: 0,
          powerConsumption: 5,
          lifeSupport: false,
          category: 'utility'
        },
        { 
          id: 'radar-array', 
          name: 'Radar Array', 
          icon: '📡', 
          description: 'Detection and tracking',
          size: { width: 80, height: 80 },
          capacity: 0,
          powerConsumption: 8,
          lifeSupport: false,
          category: 'utility'
        },
        { 
          id: 'sensor-array', 
          name: 'Sensor Array', 
          icon: '🔍', 
          description: 'Environmental monitoring',
          size: { width: 50, height: 50 },
          capacity: 0,
          powerConsumption: 2,
          lifeSupport: false,
          category: 'utility'
        },
        { 
          id: 'emergency-beacon', 
          name: 'Emergency Beacon', 
          icon: '🚨', 
          description: 'Emergency communication',
          size: { width: 30, height: 40 },
          capacity: 0,
          powerConsumption: 1,
          lifeSupport: false,
          category: 'utility'
        },
        { 
          id: 'navigation-system', 
          name: 'Nav System', 
          icon: '🧭', 
          description: 'Navigation and guidance',
          size: { width: 40, height: 50 },
          capacity: 0,
          powerConsumption: 3,
          lifeSupport: false,
          category: 'utility'
        }
      ]
    },
    '3d': {
      'Space Structures': [
        { 
          id: 'orbital-station', 
          name: 'Orbital Station', 
          icon: '🛰️', 
          description: 'Large orbital habitat',
          size: { width: 200, height: 200 },
          capacity: 50,
          powerConsumption: 150,
          lifeSupport: true,
          category: 'structure'
        },
        { 
          id: 'mars-base', 
          name: 'Mars Base', 
          icon: '🏗️', 
          description: 'Planetary settlement',
          size: { width: 300, height: 250 },
          capacity: 100,
          powerConsumption: 200,
          lifeSupport: true,
          category: 'structure'
        },
        { 
          id: 'lunar-colony', 
          name: 'Lunar Colony', 
          icon: '🌙', 
          description: 'Moon habitat complex',
          size: { width: 250, height: 200 },
          capacity: 75,
          powerConsumption: 180,
          lifeSupport: true,
          category: 'structure'
        },
        { 
          id: 'asteroid-mining', 
          name: 'Asteroid Mine', 
          icon: '⛏️', 
          description: 'Mining facility',
          size: { width: 180, height: 150 },
          capacity: 25,
          powerConsumption: 120,
          lifeSupport: false,
          category: 'structure'
        },
        { 
          id: 'space-elevator', 
          name: 'Space Elevator', 
          icon: '🛗', 
          description: 'Orbital transport system',
          size: { width: 100, height: 400 },
          capacity: 0,
          powerConsumption: 300,
          lifeSupport: false,
          category: 'structure'
        },
        { 
          id: 'ring-habitat', 
          name: 'Ring Habitat', 
          icon: '🪐', 
          description: 'Rotating space station',
          size: { width: 350, height: 350 },
          capacity: 200,
          powerConsumption: 500,
          lifeSupport: true,
          category: 'structure'
        }
      ],
      'Advanced Systems': [
        { 
          id: 'fusion-reactor', 
          name: 'Fusion Reactor', 
          icon: '☀️', 
          description: 'Advanced power generation',
          size: { width: 120, height: 120 },
          capacity: 0,
          powerConsumption: -500,
          lifeSupport: false,
          category: 'power'
        },
        { 
          id: 'gravity-generator', 
          name: 'Gravity Gen', 
          icon: '🌌', 
          description: 'Artificial gravity system',
          size: { width: 80, height: 100 },
          capacity: 0,
          powerConsumption: 50,
          lifeSupport: false,
          category: 'system'
        },
        { 
          id: 'shield-generator', 
          name: 'Shield Gen', 
          icon: '🛡️', 
          description: 'Radiation protection',
          size: { width: 100, height: 80 },
          capacity: 0,
          powerConsumption: 75,
          lifeSupport: false,
          category: 'system'
        },
        { 
          id: 'quantum-comm', 
          name: 'Quantum Comm', 
          icon: '🌀', 
          description: 'Instant communication',
          size: { width: 60, height: 60 },
          capacity: 0,
          powerConsumption: 25,
          lifeSupport: false,
          category: 'system'
        },
        { 
          id: 'terraforming', 
          name: 'Terraforming', 
          icon: '🌍', 
          description: 'Planet modification system',
          size: { width: 200, height: 150 },
          capacity: 0,
          powerConsumption: 1000,
          lifeSupport: false,
          category: 'system'
        }
      ]
    }
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setIsToolsOpen(false);
    setSelectedTool(null);
    setSelectedElement(null);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleToolsToggle = () => {
    setIsToolsOpen(!isToolsOpen);
  };

  const handlePropertiesToggle = () => {
    setIsPropertiesOpen(!isPropertiesOpen);
  };

  const handleToolSelect = (tool) => {
    setSelectedTool(tool);
    setIsToolsOpen(false);
  };

  const handleCanvasClick = (e) => {
    if (selectedTool) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newElement = {
        id: Date.now(),
        tool: selectedTool,
        x: x - selectedTool.size.width / 2,
        y: y - selectedTool.size.height / 2,
        rotation: 0,
        scale: 1,
        connections: []
      };
      setCanvasElements(prev => [...prev, newElement]);
      setPartsCount(prev => prev + 1);
      setSelectedTool(null);
    }
  };

  const handleElementClick = (element, e) => {
    e.stopPropagation();
    setSelectedElement(element);
    setSelectedTool(null);
  };

  const handleElementMouseDown = (element, e) => {
    e.stopPropagation();
    setIsDragging(true);
    setSelectedElement(element);
    
    const rect = canvasRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left - element.x,
      y: e.clientY - rect.top - element.y
    });
  };

  const handleCanvasMouseMove = (e) => {
    if (isDragging && selectedElement) {
      const rect = canvasRef.current.getBoundingClientRect();
      const newX = e.clientX - rect.left - dragOffset.x;
      const newY = e.clientY - rect.top - dragOffset.y;
      
      setCanvasElements(prev => prev.map(el => 
        el.id === selectedElement.id 
          ? { ...el, x: Math.max(0, Math.min(newX, rect.width - el.tool.size.width)), 
                    y: Math.max(0, Math.min(newY, rect.height - el.tool.size.height)) }
          : el
      ));
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleElementDelete = (elementId, e) => {
    e.stopPropagation();
    setCanvasElements(prev => prev.filter(el => el.id !== elementId));
    setPartsCount(prev => prev - 1);
    if (selectedElement && selectedElement.id === elementId) {
      setSelectedElement(null);
    }
  };

  const handleElementRotate = (elementId, direction) => {
    setCanvasElements(prev => prev.map(el => 
      el.id === elementId 
        ? { ...el, rotation: el.rotation + (direction === 'left' ? -90 : 90) }
        : el
    ));
  };

  const handleElementScale = (elementId, direction) => {
    setCanvasElements(prev => prev.map(el => 
      el.id === elementId 
        ? { ...el, scale: Math.max(0.5, Math.min(2, el.scale + (direction === 'up' ? 0.1 : -0.1))) }
        : el
    ));
  };

  const handleSave = () => {
    // Implement save functionality
    console.log('Saving habitat design...', canvasElements);
    alert('Habitat design saved successfully!');
    setIsMenuOpen(false);
  };

  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting habitat design...', canvasElements);
    alert('Habitat design exported as image!');
    setIsMenuOpen(false);
  };

  const handleClearCanvas = () => {
    setCanvasElements([]);
    setPartsCount(0);
    setSelectedTool(null);
  };

  const handleDeleteElement = (elementId) => {
    setCanvasElements(prev => prev.filter(el => el.id !== elementId));
    setPartsCount(prev => prev - 1);
  };

  useEffect(() => {
    // Add floating particles animation
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
      particle.style.animationDelay = Math.random() * 2 + 's';
      document.querySelector('.dashboard-background').appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 5000);
    };

    const interval = setInterval(createParticle, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-background">
        <div className="stars">
          {[...Array(50)].map((_, i) => (
            <div key={i} className={`star star-${i + 1}`}></div>
          ))}
        </div>
        <div className="space-gradient"></div>
      </div>

      <div className="dashboard-container">
        {/* Top Menu */}
        <div className="top-menu">
          <button className="menu-button" onClick={handleMenuToggle}>
            <div className="menu-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="menu-text">Menu</span>
          </button>

          {/* View Mode Selector */}
          <div className="view-mode-selector">
            <button 
              className={`mode-button ${viewMode === '2d' ? 'active' : ''}`}
              onClick={() => handleViewModeChange('2d')}
            >
              <span className="mode-icon">📐</span>
              <span className="mode-text">2D</span>
            </button>
            <button 
              className={`mode-button ${viewMode === '3d' ? 'active' : ''}`}
              onClick={() => handleViewModeChange('3d')}
            >
              <span className="mode-icon">🎲</span>
              <span className="mode-text">3D</span>
            </button>
          </div>

          {/* Menu Dropdown */}
          {isMenuOpen && (
            <div className="menu-dropdown">
              <div className="dropdown-item" onClick={handleSave}>
                <span className="dropdown-icon">💾</span>
                <span className="dropdown-text">Save Design</span>
              </div>
              <div className="dropdown-item" onClick={handleExport}>
                <span className="dropdown-icon">📸</span>
                <span className="dropdown-text">Export Image</span>
              </div>
              <div className="dropdown-item" onClick={handleClearCanvas}>
                <span className="dropdown-icon">🗑️</span>
                <span className="dropdown-text">Clear Canvas</span>
              </div>
            </div>
          )}
        </div>

        {/* Main Canvas */}
        <div className="canvas-container">
          <div 
            className="design-canvas" 
            ref={canvasRef}
            onClick={handleCanvasClick}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            style={{ cursor: selectedTool ? 'crosshair' : 'default' }}
          >
            {canvasElements.map((element) => (
              <div
                key={element.id}
                className={`canvas-element ${selectedElement && selectedElement.id === element.id ? 'selected' : ''}`}
                style={{
                  left: element.x,
                  top: element.y,
                  width: element.tool.size.width,
                  height: element.tool.size.height,
                  transform: `rotate(${element.rotation}deg) scale(${element.scale})`
                }}
                onClick={(e) => handleElementClick(element, e)}
                onMouseDown={(e) => handleElementMouseDown(element, e)}
              >
                <div className="element-icon">{element.tool.icon}</div>
                <div className="element-label">{element.tool.name}</div>
                <div className="element-controls">
                  <button 
                    className="control-btn delete-btn"
                    onClick={(e) => handleElementDelete(element.id, e)}
                    title="Delete"
                  >
                    ×
                  </button>
                  <button 
                    className="control-btn rotate-btn"
                    onClick={(e) => handleElementRotate(element.id, 'left')}
                    title="Rotate Left"
                  >
                    ↶
                  </button>
                  <button 
                    className="control-btn rotate-btn"
                    onClick={(e) => handleElementRotate(element.id, 'right')}
                    title="Rotate Right"
                  >
                    ↷
                  </button>
                  <button 
                    className="control-btn scale-btn"
                    onClick={(e) => handleElementScale(element.id, 'up')}
                    title="Scale Up"
                  >
                    +
                  </button>
                  <button 
                    className="control-btn scale-btn"
                    onClick={(e) => handleElementScale(element.id, 'down')}
                    title="Scale Down"
                  >
                    −
                  </button>
                </div>
                <div className="element-info">
                  <div className="info-item">Power: {element.tool.powerConsumption > 0 ? '+' : ''}{element.tool.powerConsumption}kW</div>
                  {element.tool.capacity > 0 && <div className="info-item">Capacity: {element.tool.capacity}</div>}
                </div>
              </div>
            ))}
            
            {/* Canvas Grid */}
            <div className="canvas-grid"></div>
            
            {/* Canvas Center Marker */}
            <div className="canvas-center">
              <div className="center-cross"></div>
            </div>
          </div>
        </div>

        {/* Bottom Toolbar */}
        <div className="bottom-toolbar">
          <div className="toolbar-left">
            <div className="toolbar-item" onClick={handleClearCanvas} title="Clear Canvas">
              <span className="toolbar-icon">🗑️</span>
            </div>
            <div className="toolbar-item" title="Power Analysis">
              <span className="toolbar-icon">⚡</span>
            </div>
            <div className="toolbar-item" title="Connect Elements">
              <span className="toolbar-icon">🔗</span>
            </div>
            <div className="toolbar-item" onClick={handlePropertiesToggle} title="Properties">
              <span className="toolbar-icon">⚙️</span>
            </div>
            <div className="parts-counter">
              <span className="counter-text">{partsCount} parts</span>
            </div>
          </div>

          <div className="toolbar-right">
            <button className="add-button" onClick={handleToolsToggle}>
              <span className="add-icon">+</span>
            </button>
          </div>
        </div>

        {/* Tools Panel */}
        {isToolsOpen && (
          <div className="tools-panel">
            <div className="tools-header">
              <h3 className="tools-title">
                {viewMode === '2d' ? '2D Design Tools' : '3D Design Tools'}
              </h3>
              <button className="tools-close" onClick={() => setIsToolsOpen(false)}>
                ×
              </button>
            </div>
            
            <div className="tools-content">
              {Object.entries(designTools[viewMode]).map(([category, tools]) => (
                <div key={category} className="tool-category">
                  <h4 className="category-title">{category}</h4>
                  <div className="tools-grid">
                    {tools.map((tool) => (
                      <div
                        key={tool.id}
                        className="tool-item"
                        onClick={() => handleToolSelect(tool)}
                      >
                        <div className="tool-icon">{tool.icon}</div>
                        <div className="tool-info">
                          <div className="tool-name">{tool.name}</div>
                          <div className="tool-description">{tool.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Tool Info */}
        {selectedTool && (
          <div className="selected-tool-info">
            <div className="tool-preview">
              <span className="preview-icon">{selectedTool.icon}</span>
              <span className="preview-name">{selectedTool.name}</span>
            </div>
            <div className="tool-instructions">
              Click on the canvas to place this tool
            </div>
          </div>
        )}

        {/* Properties Panel */}
        {isPropertiesOpen && (
          <div className="properties-panel">
            <div className="properties-header">
              <h3 className="properties-title">Element Properties</h3>
              <button className="properties-close" onClick={() => setIsPropertiesOpen(false)}>
                ×
              </button>
            </div>
            
            <div className="properties-content">
              {selectedElement ? (
                <div className="element-properties">
                  <div className="property-group">
                    <h4 className="property-title">Basic Info</h4>
                    <div className="property-item">
                      <span className="property-label">Name:</span>
                      <span className="property-value">{selectedElement.tool.name}</span>
                    </div>
                    <div className="property-item">
                      <span className="property-label">Type:</span>
                      <span className="property-value">{selectedElement.tool.category}</span>
                    </div>
                    <div className="property-item">
                      <span className="property-label">Description:</span>
                      <span className="property-value">{selectedElement.tool.description}</span>
                    </div>
                  </div>

                  <div className="property-group">
                    <h4 className="property-title">Specifications</h4>
                    <div className="property-item">
                      <span className="property-label">Size:</span>
                      <span className="property-value">{selectedElement.tool.size.width} × {selectedElement.tool.size.height} units</span>
                    </div>
                    <div className="property-item">
                      <span className="property-label">Power Consumption:</span>
                      <span className={`property-value ${selectedElement.tool.powerConsumption < 0 ? 'power-generator' : 'power-consumer'}`}>
                        {selectedElement.tool.powerConsumption > 0 ? '+' : ''}{selectedElement.tool.powerConsumption} kW
                      </span>
                    </div>
                    {selectedElement.tool.capacity > 0 && (
                      <div className="property-item">
                        <span className="property-label">Capacity:</span>
                        <span className="property-value">{selectedElement.tool.capacity} people</span>
                      </div>
                    )}
                    <div className="property-item">
                      <span className="property-label">Life Support:</span>
                      <span className="property-value">{selectedElement.tool.lifeSupport ? 'Required' : 'Not Required'}</span>
                    </div>
                  </div>

                  <div className="property-group">
                    <h4 className="property-title">Transform</h4>
                    <div className="property-item">
                      <span className="property-label">Position:</span>
                      <span className="property-value">{Math.round(selectedElement.x)}, {Math.round(selectedElement.y)}</span>
                    </div>
                    <div className="property-item">
                      <span className="property-label">Rotation:</span>
                      <span className="property-value">{selectedElement.rotation}°</span>
                    </div>
                    <div className="property-item">
                      <span className="property-label">Scale:</span>
                      <span className="property-value">{selectedElement.scale.toFixed(2)}x</span>
                    </div>
                  </div>

                  <div className="property-group">
                    <h4 className="property-title">Actions</h4>
                    <div className="property-actions">
                      <button 
                        className="action-btn rotate-btn"
                        onClick={() => handleElementRotate(selectedElement.id, 'left')}
                      >
                        ↶ Rotate Left
                      </button>
                      <button 
                        className="action-btn rotate-btn"
                        onClick={() => handleElementRotate(selectedElement.id, 'right')}
                      >
                        ↷ Rotate Right
                      </button>
                      <button 
                        className="action-btn scale-btn"
                        onClick={() => handleElementScale(selectedElement.id, 'up')}
                      >
                        + Scale Up
                      </button>
                      <button 
                        className="action-btn scale-btn"
                        onClick={() => handleElementScale(selectedElement.id, 'down')}
                      >
                        − Scale Down
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={(e) => handleElementDelete(selectedElement.id, e)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="no-selection">
                  <div className="no-selection-icon">🎯</div>
                  <div className="no-selection-text">Select an element to view its properties</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

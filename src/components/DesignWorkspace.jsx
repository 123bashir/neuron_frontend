import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './DesignWorkspace.css';

const DesignWorkspace = ({ selectedDesign, onDesignUpdate, onClose }) => {
  const [workspaceElements, setWorkspaceElements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('tools');
  const canvasRef = useRef(null);

  // Initialize workspace with selected design
  useEffect(() => {
    if (selectedDesign) {
      setWorkspaceElements(selectedDesign.elements || []);
    }
  }, [selectedDesign]);

  const addElementToWorkspace = (tool) => {
    const newElement = {
      id: Date.now(),
      type: 'design-element',
      tool: tool,
      position: { x: Math.random() * 400 + 50, y: Math.random() * 300 + 50 },
      size: { width: 120, height: 80 },
      style: {
        background: 'linear-gradient(135deg, #64b5f6 0%, #42a5f5 100%)',
        color: 'white',
        borderRadius: '8px',
        padding: '10px',
        fontSize: '12px',
        fontWeight: '500',
        boxShadow: '0 4px 15px rgba(100, 181, 246, 0.3)',
        cursor: 'move'
      }
    };

    setWorkspaceElements(prev => [...prev, newElement]);
  };

  const removeElement = (elementId) => {
    setWorkspaceElements(prev => prev.filter(el => el.id !== elementId));
  };

  const updateElementPosition = (elementId, newPosition) => {
    setWorkspaceElements(prev => 
      prev.map(el => 
        el.id === elementId ? { ...el, position: newPosition } : el
      )
    );
  };

  const saveWorkspace = () => {
    if (selectedDesign) {
      const updatedDesign = {
        ...selectedDesign,
        elements: workspaceElements,
        partsCount: workspaceElements.length
      };
      onDesignUpdate(updatedDesign);
    }
  };

  const ToolCard = ({ tool, index }) => (
    <div 
      className="tool-card"
      onClick={() => addElementToWorkspace(tool)}
      style={{
        animationDelay: `${index * 0.1}s`
      }}
    >
      <div className="tool-icon">
        {tool.icon || '🛠️'}
      </div>
      <h4 className="tool-name">{tool.name}</h4>
      <p className="tool-description">{tool.description}</p>
      <div className="tool-badge">Design Tool</div>
    </div>
  );

  const WorkspaceElement = ({ element }) => (
    <div
      className="workspace-element"
      style={{
        position: 'absolute',
        left: element.position.x,
        top: element.position.y,
        width: element.size.width,
        height: element.size.height,
        ...element.style
      }}
      draggable
      onDragEnd={(e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const newPosition = {
          x: e.clientX - rect.left - element.size.width / 2,
          y: e.clientY - rect.top - element.size.height / 2
        };
        updateElementPosition(element.id, newPosition);
      }}
    >
      <div className="element-header">
        <span className="element-title">{element.tool.name}</span>
        <button 
          className="element-remove"
          onClick={() => removeElement(element.id)}
        >
          ×
        </button>
      </div>
      <div className="element-content">
        <div className="element-icon">
          {element.tool.icon || '🛠️'}
        </div>
        <div className="element-info">
          <div className="element-type">Design Tool</div>
          <div className="element-status">Ready</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="design-workspace">
      <div className="workspace-header">
        <div className="workspace-title">
          <h2>🚀 Design Workspace</h2>
          <span className="workspace-subtitle">
            {selectedDesign ? `Editing: ${selectedDesign.name}` : 'Create New Design'}
          </span>
        </div>
        <div className="workspace-actions">
          <button className="action-btn secondary" onClick={onClose}>
            ← Back to Dashboard
          </button>
          <button className="action-btn primary" onClick={saveWorkspace}>
            💾 Save Design
          </button>
        </div>
      </div>

      <div className="workspace-content">
        <div className="workspace-sidebar">
          <div className="sidebar-tabs">
            <button 
              className={`tab ${activeTab === 'tools' ? 'active' : ''}`}
              onClick={() => setActiveTab('tools')}
            >
              🛠️ NASA Tools
            </button>
            <button 
              className={`tab ${activeTab === 'data' ? 'active' : ''}`}
              onClick={() => setActiveTab('data')}
            >
              🌍 Earth Data
            </button>
          </div>

          <div className="sidebar-content">
            {activeTab === 'tools' && (
              <div className="tools-panel">
                <div className="panel-header">
                  <h3>Design Tools</h3>
                </div>
                <div className="tools-grid">
                  <div className="tool-card" onClick={() => addElementToWorkspace({ name: 'Text Block', description: 'Add text content to your design', icon: '📝' })}>
                    <div className="tool-icon">📝</div>
                    <h4 className="tool-name">Text Block</h4>
                    <p className="tool-description">Add text content to your design</p>
                    <div className="tool-badge">Content</div>
                  </div>
                  
                  <div className="tool-card" onClick={() => addElementToWorkspace({ name: 'Image Placeholder', description: 'Insert image placeholder', icon: '🖼️' })}>
                    <div className="tool-icon">🖼️</div>
                    <h4 className="tool-name">Image Placeholder</h4>
                    <p className="tool-description">Insert image placeholder</p>
                    <div className="tool-badge">Media</div>
                  </div>
                  
                  <div className="tool-card" onClick={() => addElementToWorkspace({ name: 'Shape Tool', description: 'Draw geometric shapes', icon: '🔷' })}>
                    <div className="tool-icon">🔷</div>
                    <h4 className="tool-name">Shape Tool</h4>
                    <p className="tool-description">Draw geometric shapes</p>
                    <div className="tool-badge">Drawing</div>
                  </div>
                  
                  <div className="tool-card" onClick={() => addElementToWorkspace({ name: 'Line Tool', description: 'Draw lines and connectors', icon: '📏' })}>
                    <div className="tool-icon">📏</div>
                    <h4 className="tool-name">Line Tool</h4>
                    <p className="tool-description">Draw lines and connectors</p>
                    <div className="tool-badge">Drawing</div>
                  </div>
                  
                  <div className="tool-card" onClick={() => addElementToWorkspace({ name: 'Button Element', description: 'Interactive button component', icon: '🔘' })}>
                    <div className="tool-icon">🔘</div>
                    <h4 className="tool-name">Button Element</h4>
                    <p className="tool-description">Interactive button component</p>
                    <div className="tool-badge">UI</div>
                  </div>
                  
                  <div className="tool-card" onClick={() => addElementToWorkspace({ name: 'Container Box', description: 'Group elements together', icon: '📦' })}>
                    <div className="tool-icon">📦</div>
                    <h4 className="tool-name">Container Box</h4>
                    <p className="tool-description">Group elements together</p>
                    <div className="tool-badge">Layout</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'data' && (
              <div className="data-panel">
                <div className="panel-header">
                  <h3>Data Sources</h3>
                </div>
                <div className="data-sources">
                  <div className="data-source-btn" onClick={() => console.log('Import CSV data')}>
                    📊 Import CSV Data
                  </div>
                  <div className="data-source-btn" onClick={() => console.log('Connect to Database')}>
                    🗄️ Connect to Database
                  </div>
                  <div className="data-source-btn" onClick={() => console.log('API Integration')}>
                    🔌 API Integration
                  </div>
                  <div className="data-source-btn" onClick={() => console.log('Upload Files')}>
                    📁 Upload Files
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="workspace-canvas" ref={canvasRef}>
          <div className="canvas-header">
            <h3>Design Canvas</h3>
            <div className="canvas-info">
              Elements: {workspaceElements.length}
            </div>
          </div>
          <div className="canvas-area">
            {workspaceElements.map(element => (
              <WorkspaceElement key={element.id} element={element} />
            ))}
            {workspaceElements.length === 0 && (
              <div className="empty-canvas">
                <div className="empty-icon">🎨</div>
                <h3>Start Designing</h3>
                <p>Drag design tools from the sidebar to begin creating your design</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignWorkspace;
